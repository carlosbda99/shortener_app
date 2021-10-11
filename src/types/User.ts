import {Url} from "./Url";

export interface User {
  username: string;
  name: string;
  id: number;
  urls: Url[];
  email: string;
}
