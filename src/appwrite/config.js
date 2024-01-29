import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //create post
  async createPost({ title, slug, content, featureImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featureImage, status, userId }
      );
    } catch (error) {
      console.log("appwrite service :: create post :: error", error);
    }
  }

  //update post
  async updatePost(slug, { title, content, featureImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featureImage, status }
      );
    } catch (error) {
      console.log("appwrite service :: Update post :: error", error);
    }
  }

  //delete post

  async deletePost({ slug }) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("appwrite service :: Update post :: error", error);
      return false;
    }
  }

  //get one post
  async getPost({ slug }) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("appwrite service :: get post :: error", error);
      return false;
    }
  }

  //get all post
  async getAllPost() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("key", "active")]
      );
    } catch (error) {
      console.log("appwrite service :: get all post :: error", error);
      return false;
    }
  }

  //Upload file
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("appwrite service :: get all post :: error", error);
      return false;
    }
  }

  //Delete file
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("appwrite service :: get all post :: error", error);
      return false;
    }
  }

  //file preview
  async previewFile(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;
