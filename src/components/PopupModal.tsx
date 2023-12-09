import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import styled from "styled-components/native";
import Text from "./Text";
import { PopupProps } from "../types/Popup";
import DropDownPicker from "react-native-dropdown-picker";
import theme from "../theme";
import { AntDesign } from "@expo/vector-icons";

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalView = styled.View`
  background-color: ${theme.colors.textSecondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 20px;
`;

const TopContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
`;

const StyledInputContainer = styled.View`
  align-self: flex-start;
  width: 240px;
  padding-top: 20px;
  z-index: 1;
`;

const StyledTextInput = styled.TextInput`
  border: 1px solid ${theme.colors.borderColor};
  padding: 10px;
  height: 40px;
  border-radius: 5px;
`;

const StyledButton = styled(TouchableOpacity)`
  background-color: ${theme.colors.unSelectedColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  padding: 10px 15px;
  border-radius: 10px;
`;

const PopupModal = ({ visible, onClose, categories }: PopupProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [open, setOpen] = useState(false);

  const closePopup = () => {
    setName("");
    setPrice("");
    setSelectedCategory("");
    setOpen(false);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <CenteredView>
          <ModalView>
            <TopContainer>
              <Text color="textPrimary" fontSize="subheading" fontWeight="bold">
                Add new product
              </Text>
              <TouchableOpacity activeOpacity={1} onPress={closePopup}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </TopContainer>
            <StyledInputContainer>
              <Text>Product name</Text>
              <StyledTextInput
                placeholder="Product Name"
                placeholderTextColor="#000"
                value={name}
                onChangeText={setName}
              />
            </StyledInputContainer>
            <StyledInputContainer>
              <Text>Price</Text>
              <StyledTextInput
                placeholder="Price in euros €"
                placeholderTextColor="#000"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
            </StyledInputContainer>

            <StyledInputContainer>
              <Text>Category</Text>

              <DropDownPicker
                open={open}
                value={selectedCategory}
                items={categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
                setOpen={setOpen}
                setValue={setSelectedCategory}
                placeholder="Select a category"
                style={{
                  borderColor: theme.colors.borderColor,
                  minHeight: 40,
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                dropDownContainerStyle={{
                  width: 240,
                  zIndex: 2,
                  borderWidth: 0,
                }}
              />
            </StyledInputContainer>

            <StyledButton onPress={onClose} activeOpacity={1}>
              <AntDesign name="plus" size={24} color="white" />

              <Text color="textSecondary" style={{ marginLeft: 10 }}>
                Create
              </Text>
            </StyledButton>
          </ModalView>
        </CenteredView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PopupModal;
