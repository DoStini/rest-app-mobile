import React from "react";
import { View, ActivityIndicator } from "react-native";

const LoadingComponent = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

export default LoadingComponent;
