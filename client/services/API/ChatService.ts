import { Conversation } from "@/utils/Types";
import { API_URL } from "@/utils/Variables";
import { Options } from "next/dist/server/dev/next-dev-server";

export class ChatService {
  private _userId: string;
  private _API_URL: string;

  constructor(userId: string) {
    this._userId = userId;
    this._API_URL = API_URL;
  }

  public async fetchConversation() {
    try {
      const requestUrl = `${this._API_URL}/chat?userId=${this._userId}`;
      const headers = new Headers();

      const requestOptions: RequestInit = {
        headers,
        cache: "no-store",
      };

      const response = await fetch(requestUrl, requestOptions);
      if (response.ok) {
        const data = await response.json();
        return data.conversation as Conversation;
      }

      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
