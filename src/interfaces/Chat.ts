import { User } from "./User";
import { Message } from "./Message";

export interface Chat {
  id: string;
  participants: Array<User>;
  messages: Array<Message>;
}
