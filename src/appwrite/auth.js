import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  /* signup */
  async createAccount({ email, password, name }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        {
          /* call another */
          return this.login({ email, password });
        }
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  /* login */
  async loginAccount({ email, password }) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  //get current user

  async getCurrentUser() {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service::this.getCurrentUser ::error ", error);
    }
    return null;
  }

  //delete current user

  async logoutUser() {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service::this.getCurrentUser ::error ", error);
    }
    return null;
  }
}

const authService = new AuthService();

export default authService;
