import React from "react";
import { View, ActivityIndicator } from "react-native";

const LoadingComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

export default LoadingComponent;
