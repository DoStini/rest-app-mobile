import { Modal, Pressable, View } from "react-native";
import Text from "../../Text";
import ContainerStyle from "../../../styles/Containers";
import React, { useState } from "react";
import theme from "../../../theme";
import Divider from "../../Divider";
import Button from "../../Button";
import { TextInput } from "react-native-gesture-handler";

export const CommentModal = ({
  defaultComment,
  commandModalOpen,
  setCommandModalOpen,
  updatingComment,
  onSaveComment,
}: {
  defaultComment: string;
  commandModalOpen: boolean;
  setCommandModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updatingComment: boolean;
  onSaveComment: (comment: string) => void;
}) => {
  const [comment, setComment] = useState(defaultComment);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={commandModalOpen}
      onRequestClose={() => setCommandModalOpen(false)}
      style={ContainerStyle.modalContainer}
    >
      <Pressable
        onPress={() => setCommandModalOpen(false)}
        style={ContainerStyle.modalContainer}
      >
        <View style={ContainerStyle.modal}>
          <Text
            fontSize="medium"
            fontWeight="bold"
            style={{ paddingBottom: 15 }}
          >
            Comment
          </Text>

          <Divider marginHorizontal={-35} />

          <TextInput
            multiline
            textAlignVertical="top"
            numberOfLines={6}
            placeholder="Comment"
            value={comment}
            onChangeText={setComment}
          />

          <Divider marginHorizontal={-35} />

          <View style={ContainerStyle.rowSpaceBetween}>
            <Button
              text="Cancel"
              loading={updatingComment}
              onPress={() => setCommandModalOpen(false)}
              style={{ backgroundColor: theme.colors.error }}
            />
            <Button
              text="Save"
              loading={updatingComment}
              onPress={() => onSaveComment(comment)}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};
