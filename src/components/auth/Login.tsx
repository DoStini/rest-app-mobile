import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import FormStyles from "../../styles/Forms";
import Button from "../Button";
import TextStyles from "../../styles/Text";
import { Formik } from "formik";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { fetchingLogin, errorLogin, login } = useAuth();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={TextStyles.h1}>Welcome to Resty</Text>
        <Text style={{ ...TextStyles.body, paddingBottom: 30, paddingTop: 15 }}>
          Please authenticate to access the platform
        </Text>

        <View style={styles.formComponent}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values) => login(values.email, values.password)}
          >
            {({ handleChange, handleBlur, handleSubmit, errors, values }) => (
              <>
                <TextInput
                  style={FormStyles.input}
                  placeholder="Email"
                  value={values.email}
                  testID="email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                {errors.email && (
                  <Text style={FormStyles.error}>{errors.email}</Text>
                )}

                <TextInput
                  style={FormStyles.input}
                  value={values.password}
                  testID="password"
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                {errors.password && (
                  <Text style={{ ...FormStyles.error, paddingBottom: 12 }}>
                    {errors.password}
                  </Text>
                )}

                {errorLogin && (
                  <Text style={{ ...FormStyles.error, paddingBottom: 12 }}>
                    Invalid email or password
                  </Text>
                )}

                <Button
                  testID="submit"
                  text="Login"
                  onPress={handleSubmit}
                  loading={fetchingLogin}
                />
              </>
            )}
          </Formik>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
