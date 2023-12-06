import styled from "styled-components/native";
import Text from "../components/Text";
import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import theme from "../theme";
import { AntDesign } from "@expo/vector-icons";
import { PRODUCT_FILTERS } from "../constants";
import { mockData } from "../mockData";
import { ProductsProps } from "../types/StackTypes";

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-top: 50px;
`;

const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  padding: 5px;
  margin: 10px;
  background-color: ${theme.colors.backgroundSecondary};
  border-radius: 10px;
`;

const StyledTextInput = styled(TextInput)`
  background-color: ${theme.colors.backgroundSecondary};
  margin: 10px;
`;

const FilterButton = styled(TouchableOpacity)`
  padding: 10px 20px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.selected ? theme.colors.selectedColor : theme.colors.unSelectedColor};
  margin: 5px;
`;

const FilterContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledScrollView = styled.ScrollView`
  margin-top: 20px;
  width: 90%;
  height: 70%;
  border: 1px solid ${theme.colors.borderColor};
`;

const ListItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.selectedColor};
  height: 50px;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.textSecondary};
`;

const Products: React.FC<ProductsProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(1);

  // Function to get filtered data based on the selected filter
  const getFilteredData = () => {
    const filterKey = PRODUCT_FILTERS[selectedFilter].toLowerCase();

    if (filterKey in mockData) {
      const data = mockData[filterKey as keyof typeof mockData] || [];

      return data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return [];
  };

  // Filter the data based on the selected filter
  const filteredData = getFilteredData();

  const goToProduct = (id: string) => {
    navigation.navigate("Product", { id: id });
  };

  return (
    <Container>
      <Text fontSize="heading" fontWeight="bold" shadow={true}>
        Products
      </Text>
      <InputContainer>
        <AntDesign name="search1" size={24} color={theme.colors.textPrimary} />
        <StyledTextInput
          value={searchQuery}
          placeholder="Produto a pesquisar..."
          onChangeText={(query: string) => setSearchQuery(query)}
        />
      </InputContainer>
      <FilterContainer>
        {PRODUCT_FILTERS.map((option, index) => (
          <FilterButton
            key={index}
            selected={selectedFilter === index}
            onPress={() => setSelectedFilter(index)}
          >
            <Text
              color={selectedFilter === index ? "textSecondary" : "textPrimary"}
            >
              {option}
            </Text>
          </FilterButton>
        ))}
      </FilterContainer>
      <StyledScrollView>
        {filteredData.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => goToProduct(item.id)}>
            <ListItemContainer key={item.id}>
              <Text fontSize="subheading" color="textSecondary">
                {item.name}
              </Text>
              <Text fontSize="subheading" color="textSecondary">
                {item.price}
              </Text>
            </ListItemContainer>
          </TouchableOpacity>
        ))}
      </StyledScrollView>
    </Container>
  );
};

export default Products;
