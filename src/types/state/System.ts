import { SimpleTable } from "../../Table";
import { User } from "../../User";

export interface TablesInfo {
  tables: SimpleTable[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface AuthInfo {
  user: User | null;
  loading: boolean;
  error: boolean;
  fetchingLogin: boolean;
  errorLogin: boolean;
}

export interface SystemInfo {
  tablesInfo: TablesInfo;
  snackbar: string | null;
  auth: AuthInfo;
}
