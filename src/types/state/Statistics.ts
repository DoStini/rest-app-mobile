export type Statistic = {
  name: string;
  value: string;
  preValue?: string;
  subValue?: string;
};

export type ProductsStatistics = {
  total: number;
  products: {
    name: string;
    amount: number;
  }[];
  categories: {
    name: string;
    amount: number;
  }[];
};

export type MainStatistics = Statistic[];

export type Statistics = {
  main: {
    status: "idle" | "loading" | "succeeded" | "failed";
    statistics: MainStatistics;
  };
  products: {
    statistics: ProductsStatistics | null;
    status: "idle" | "loading" | "succeeded" | "failed";
  };
};
