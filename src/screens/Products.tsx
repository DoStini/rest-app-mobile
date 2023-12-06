import styled from "styled-components/native";
import Text from "../components/Text";
import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import theme from "../theme";
import { AntDesign } from "@expo/vector-icons";
import { ProductsProps } from "../types/StackTypes";
import useCategories from "../hooks/useCategories";
import LoadingComponent from "../components/LoadingComponent";

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
  const [selectedFilter, setSelectedFilter] = useState<number | null>(null);
  const { categories, status, error } = useCategories();

  //console.log(categories, status, error);

  if (status === "loading") {
    return <LoadingComponent />;
  }

  // Function to get filtered data based on the selected filter
  const getFilteredProducts = () => {
    if (selectedFilter !== null) {
      const selectedCategory = categories.find(
        (category) => category.id === selectedFilter
      );
      const products = selectedCategory ? selectedCategory.products : [];

      return products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return [];
  };

  const filteredProducts = getFilteredProducts();

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
          placeholder="Search for a product..."
          onChangeText={(query: string) => setSearchQuery(query)}
        />
      </InputContainer>
      <FilterContainer>
        {categories.map((category) => (
          <FilterButton
            key={category.id}
            selected={selectedFilter === category.id}
            onPress={() => setSelectedFilter(category.id)}
          >
            <Text
              color={
                selectedFilter === category.id ? "textSecondary" : "textPrimary"
              }
            >
              {category.name}
            </Text>
          </FilterButton>
        ))}
      </FilterContainer>
      <StyledScrollView>
        {filteredProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            onPress={() => goToProduct(product.id)}
          >
            <ListItemContainer>
              <Text fontSize="subheading" color="textSecondary">
                {product.name}
              </Text>
              <Text fontSize="subheading" color="textSecondary">
                {product.price}
              </Text>
            </ListItemContainer>
          </TouchableOpacity>
        ))}
      </StyledScrollView>
    </Container>
  );
};

export default Products;
