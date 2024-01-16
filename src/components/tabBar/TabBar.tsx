import React from "react";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabBarMarker from "./TabBarMarker";
import TabBarComponent from "./TabBarComponent";
import { ScreenTitle } from "../../types/ScreenTypes";
import { getTitleForRoute, getIconForRoute } from "../../config/utils";
import { BottomTabBarProps } from "../../types/TabBarTypes";
import styled from "styled-components/native";
import { SCREEN_WIDTH, TAB_COUNT } from "../../constants";
import theme from "../../theme";

const Container = styled.View`
  background-color: ${theme.colors.barColor};
`;

const StyledTabBar = styled.View`
  flex-direction: row;
`;

const TabBar = ({
  state: { routeNames, index: selectedTab },
  navigation,
}: BottomTabBarProps) => {
  const tabWidth = SCREEN_WIDTH / TAB_COUNT;
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(tabWidth * selectedTab) }],
  }));
  const { bottom } = useSafeAreaInsets();

  return (
    <Container testID="tabBar">
      <TabBarMarker animatedStyle={animatedStyle} />
      <StyledTabBar style={{ paddingBottom: bottom }}>
        {routeNames.map((routeName, idx) => (
          <TabBarComponent
            key={routeName}
            title={getTitleForRoute(routeName as ScreenTitle)}
            icon={getIconForRoute(routeName as ScreenTitle)}
            isSelected={selectedTab === idx}
            onPress={() => navigation.navigate(routeName)}
          />
        ))}
      </StyledTabBar>
    </Container>
  );
};

export default TabBar;
