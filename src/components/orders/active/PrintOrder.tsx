import { View } from "react-native";
import ContainerStyle from "../../../styles/Containers";
import { OrderPrintProps } from "../../../types/stack/OrderStack";
import Header from "../../Header";

const PrintOrderPage = ({ navigation, route }: OrderPrintProps) => {
  const { id } = route.params;

  return (
    <View style={ContainerStyle.contentContainer}>
      <Header title={`asd`} goBack={() => navigation.pop()} />
    </View>
  );
};

export default PrintOrderPage;
