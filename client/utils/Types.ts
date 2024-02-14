export type Conversation = {
  _id: string;
  user: string;
  messages: Message[];
};

export type Message = {
  _id: string;
  timestamp: string;
  sender: string;
  content: string;
};
