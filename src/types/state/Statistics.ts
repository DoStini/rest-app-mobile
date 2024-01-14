export type Statistic = {
  name: string;
  value: string;
  preValue?: string;
  subValue?: string;
};

export type MainStatistics = Statistic[];

export type Statistics = {
  main: MainStatistics;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};
