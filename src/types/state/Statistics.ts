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

export type EmployeeStatistics = {
  monetary: {
    name: string;
    value: number;
  }[];
  biggest: {
    name: string;
    value: number;
  }[];
  quantity: {
    name: string;
    value: number;
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
  employees: {
    statistics: EmployeeStatistics | null;
    status: "idle" | "loading" | "succeeded" | "failed";
  };
  weekly: {
    statistics: {
      name: string;
      day: string;
      value: number;
    }[];
    status: "idle" | "loading" | "succeeded" | "failed";
  };
};
