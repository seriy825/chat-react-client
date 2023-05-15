import { Dispatch, SetStateAction } from "react";

export type Props = {
  setRegistered : Dispatch<SetStateAction<boolean>>,
  setToken : Dispatch<SetStateAction<string|null>>,
}