import {Props} from "react";
import {CustomError} from "./Error";
import {Url} from "./Url";

export interface AlertProps extends Props<any> {
  text: string;
  open: boolean;
  setOpen: (arg: boolean) => void;
  severity?: "success" | "warning";
}

export interface WithApiProps extends Props<any> {
  setError: (arg: CustomError) => void;
  setLoading: (arg: boolean) => void;
  error?: CustomError;
}

export interface TableURLProps extends Props<any> {
  urls?: Url[] | null;
  userId?: number | null;
  error?: CustomError;
}

export interface DialogProps extends Props<any> {
  open: boolean;
  handleClose: () => void;
}

export interface CommentProps extends Props<any> {
  open: boolean;
  comment: string;
  setComment: (arg: string) => void;
}

export interface RateProps extends Props<any> {
  setRated: (arg: boolean) => void;
}

export interface ResetPasswordProps extends Props<any> {
  setError: (arg: CustomError) => void;
  error: CustomError;
}
