import { RefreshControl, ScrollView, View } from "react-native";
import { StatisticsProductsProps } from "../../types/stack/StatisticsStack";
import Header from "../Header";
import ContainerStyle from "../../styles/Containers";
import useProductStatistics from "../../hooks/statistics/useProductsStatistics";
import { PieChart } from "react-native-chart-kit";
import { SCREEN_WIDTH } from "../../constants";
import theme from "../../theme";
import { useMemo } from "react";
import { ProductsStatistics } from "../../types/state/Statistics";
import Text from "../Text";

const COLORS = ["#f6c445", "#e45f2b", "#a0e548", "#9ac1f0", "#315098"];

const CategoriesStatistics = ({
  categories,
}: {
  categories: ProductsStatistics["categories"];
}) => {
  const chartData = useMemo(() => {
    return categories.map((category, idx) => ({
      name: category.name,
      amount: category.amount,
      color: COLORS[idx],
      legendFontColor: theme.colors.textPrimary,
      legendFontSize: 12,
    }));
  }, [categories]);

  return (
    <View style={ContainerStyle.statisticChart}>
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Text fontSize="body" fontWeight="bold">
          Most Sold Cateogories
        </Text>
      </View>
      <PieChart
        data={chartData || []}
        width={SCREEN_WIDTH}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          strokeWidth: 2,
        }}
        accessor="amount"
        paddingLeft="0"
        backgroundColor="transparent"
        center={[0, 0]}
        absolute
      />
    </View>
  );
};

const MostSoldProducts = ({
  products,
  total,
}: {
  products: ProductsStatistics["products"];
  total: number;
}) => {
  const chartData = useMemo(() => {
    return products.map((product, idx) => ({
      name: product.name,
      amount: product.amount,
      color: COLORS[idx],
      legendFontColor: theme.colors.textPrimary,
      legendFontSize: 12,
    }));
  }, [products]);

  return (
    <View style={ContainerStyle.statisticChart}>
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Text fontSize="medium" fontWeight="bold">
          Most Sold Products
        </Text>

        <Text fontSize="heading" fontWeight="bold">
          {total}
        </Text>
      </View>

      <PieChart
        data={chartData || []}
        width={SCREEN_WIDTH}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          strokeWidth: 2,
        }}
        accessor="amount"
        paddingLeft="0"
        backgroundColor="transparent"
        center={[0, 0]}
        absolute
      />
    </View>
  );
};

const ProductStatistics = ({ navigation }: StatisticsProductsProps) => {
  const { statistics, status, refresh } = useProductStatistics();

  return (
    <View style={ContainerStyle.contentContainer}>
      <Header title={"Product Statistics"} goBack={navigation.goBack} />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={status === "loading"}
            onRefresh={refresh}
          />
        }
      >
        {statistics?.products && (
          <MostSoldProducts
            products={statistics.products}
            total={statistics.total}
          />
        )}
        {statistics?.categories && (
          <CategoriesStatistics categories={statistics.categories} />
        )}
      </ScrollView>
    </View>
  );
};

export default ProductStatistics;
