import { View } from "react-native";
import Text from "../Text";
import { CreateOrderProps } from "../../types/stack/OrderStack";
import useAuth from "../../hooks/useAuth";
import useTablesInfo from "../../hooks/useTablesInfo";
import LoadingComponent from "../LoadingComponent";
import ContainerStyle from "../../styles/Containers";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../Header";

const CreateOrder = ({ navigation }: CreateOrderProps) => {
  const { user, loading, error } = useAuth();
  const { tables, status, error: errorTables } = useTablesInfo();

  if (loading || status === "loading") {
    return <LoadingComponent />;
  }

  if (error || errorTables) {
    navigation.navigate("OrderList");
    return null;
  }

  return (
    <View style={ContainerStyle.contentContainer}>
      <Header
        title="Create Order"
        goBack={() => navigation.navigate("OrderList")}
      />
    </View>
  );
};

export default CreateOrder;
