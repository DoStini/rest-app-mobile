import { useState } from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import FormStyles from "../../styles/Forms";
import Button from "../Button";
import TextStyles from "../../styles/Text";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in...", { username, password });
  };

  return (
    <View style={styles.container}>
      <Text style={TextStyles.h1}>Welcome to Resty</Text>
      <Text style={{ ...TextStyles.body, paddingBottom: 30, paddingTop: 15 }}>
        Please authenticate to access the platform
      </Text>

      <View style={styles.formComponent}>
        <TextInput
          style={FormStyles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={FormStyles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button text="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 400,
  },
  formComponent: {
    width: "80%",
    maxWidth: 400,
  },
});
