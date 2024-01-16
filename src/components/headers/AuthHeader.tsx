import { Pressable, View } from "react-native";
import useAuth from "../../hooks/useAuth";
import ContainerStyle from "../../styles/Containers";
import Button from "../Button";
import Text from "../Text";

const AuthHeader = () => {
  const { user, loading, logout } = useAuth();

  return (
    <View style={[ContainerStyle.rowSpaceBetween, { marginBottom: 15 }]}>
      <Text fontSize="body" fontWeight="medium">
        {user?.name}
      </Text>

      <Pressable onPress={logout}>
        <Text fontSize="body" fontWeight="medium" color="error">
          Logout
        </Text>
      </Pressable>
    </View>
  );
};

export default AuthHeader;
