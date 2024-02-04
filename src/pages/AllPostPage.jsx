import React, { useEffect, useState } from "react";
import { PostCard, Container } from "../components";
import appWriteService from "../appwrite/config";

function AllPostPage() {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    appWriteService.getAllPost([]).then((posts) => {
      if (posts) {
        setPost(posts.documents);
      }
    });
  },[]);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
            <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPostPage;
