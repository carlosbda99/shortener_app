import {User} from "./User";

export interface Url {
  url: string;
  urlShortened: string;
  visits: number;
  user: User;
}
