import { Pressable, View } from "react-native";
import Text from "../../Text";
import ContainerStyle from "../../../styles/Containers";
import React, { useCallback, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../../../theme";
import NumberInput from "../../NumberInput";
import { OrderProduct } from "../../../types/OrderProduct";
import {
  deleteOrderProduct,
  updateComment,
  updateOrderProduct,
} from "../../../store/selectedOrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { updateCommentById } from "../../../services/orderService";
import { CommentModal } from "./CommentModal";
import { formatPrice } from "../../../config/helpers";

export const ProductLine = ({
  product,
  deletable,
  orderClosed,
}: {
  product: OrderProduct;
  deletable: boolean;
  orderClosed: boolean;
}) => {
  const [amount, setAmount] = React.useState(product.amount);
  const dispatch = useDispatch<AppDispatch>();

  const [updatingValue, setUpdatingValue] = useState(false);
  const [commandModalOpen, setCommandModalOpen] = useState(false);
  const [updatingComment, setUpdatingComment] = useState(false);

  const updatingAmount =
    useSelector((state: RootState) => state.selectedOrder.updateStatus) ===
      "loading" || updatingValue;

  // If another user updates the amount, we want to update it in the UI
  useEffect(() => {
    if (updatingAmount) return;
    setAmount(product.amount);
  }, [product.amount]);

  const onFinishChanges = useCallback(
    (value: number) => {
      dispatch(
        updateOrderProduct({
          productId: String(product.productId),
          orderId: String(product.orderId),
          amount: value,
        })
      );

      setUpdatingValue(false);
    },
    [dispatch, updateOrderProduct, product]
  );

  const onDelete = () => {
    setUpdatingValue(false);
    dispatch(
      deleteOrderProduct({
        productId: String(product.productId),
        orderId: String(product.orderId),
      })
    );
  };

  const onSaveComment = (comment: string) => {
    setUpdatingComment(true);

    updateCommentById(
      String(product.orderId),
      String(product.productId),
      comment
    ).then(() => {
      setUpdatingComment(false);
      dispatch(updateComment(String(product.productId), comment));
      setCommandModalOpen(false);
    });
  };

  return (
    <View style={ContainerStyle.listItemContainer}>
      <View style={[ContainerStyle.rowSpaceBetween, { alignItems: "center" }]}>
        <Text
          fontSize="small"
          fontWeight="light"
          color="textSecondary"
          numberOfLines={1}
          style={{ overflow: "hidden", flex: 1 }}
        >
          {product.product.name}
        </Text>

        <CommentModal
          defaultComment={product.comment || ""}
          commandModalOpen={commandModalOpen}
          setCommandModalOpen={setCommandModalOpen}
          updatingComment={updatingComment}
          onSaveComment={onSaveComment}
        />

        {orderClosed ? (
          <Text fontSize="small" color="textSecondary" fontWeight="light">
            {product.amount}
            {" x "}
            {formatPrice(product.product.price)}
            {" = "}
            {formatPrice(product.closedTotal)}
          </Text>
        ) : (
          <View style={ContainerStyle.row}>
            <NumberInput
              value={amount}
              setValue={setAmount}
              handleDelete={deletable ? onDelete : null}
              onFinished={onFinishChanges}
              onStarted={() => setUpdatingValue(true)}
            />

            <Pressable
              style={{ paddingLeft: 10 }}
              onPress={() => setCommandModalOpen(true)}
            >
              <MaterialIcons
                name="edit"
                color={theme.colors.textSecondary}
                size={26}
              />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};
