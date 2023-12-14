import { SimpleTable } from "../../Table";

export interface TablesInfo {
  tables: SimpleTable[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface SystemInfo {
  tablesInfo: TablesInfo;
}
