import { BackHandler, Modal, Pressable, StyleSheet, View } from "react-native";
import useLiveOrder from "../../../hooks/orders/useLiveOrder";
import { OrderAddProps, OrderProps } from "../../../types/stack/OrderStack";
import LoadingComponent from "../../LoadingComponent";
import Text from "../../Text";
import ContainerStyle from "../../../styles/Containers";
import React, { useCallback, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../../../theme";
import NumberInput from "../../NumberInput";
import Divider from "../../Divider";
import { OrderProduct } from "../../../types/OrderProduct";
import {
  deleteOrderProduct,
  resetOrderState,
  updateComment,
  updateOrderProduct,
} from "../../../store/selectedOrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import Header from "../../Header";
import Button from "../../Button";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import {
  closeOrderById,
  updateCommentById,
} from "../../../services/orderService";

const Styles = StyleSheet.create({
  rowContainer: {
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
});

const CommentModal = ({
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

export const ProductLine = ({
  product,
  deletable,
}: {
  product: OrderProduct;
  deletable: boolean;
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
      </View>
    </View>
  );
};

const Products = ({
  navigation,
  id,
  products,
}: {
  navigation: OrderProps["navigation"] | OrderAddProps["navigation"];
  id: string;
  products: OrderProduct[];
}) => {
  return (
    <View>
      <View style={[ContainerStyle.rowSpaceBetween, { paddingBottom: 15 }]}>
        <Text fontSize="medium" fontWeight="bold">
          Products
        </Text>
        <MaterialIcons
          name="add-circle-outline"
          size={30}
          onPress={() => navigation.navigate("Order/Add", { id })}
        />
      </View>

      {products.map((product) => (
        <ProductLine product={product} key={product.productId} deletable />
      ))}
    </View>
  );
};

const OrderPage = ({ navigation, route }: OrderProps) => {
  const { id } = route.params;

  const isVisible = navigation.isFocused();

  const { order, status, error } = useLiveOrder(id, isVisible);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const onClose = useCallback(() => {
    setLoading(true);
    closeOrderById(id).then(() => {
      setLoading(false);
      navigation.navigate("OrderList");
    });
  }, [id]);

  useEffect(() => {
    if (String(order?.id) === String(id) || order === null) {
      return;
    }

    dispatch(resetOrderState());
  }, [order]);

  if (error) {
    console.error(error);
    navigation.navigate("OrderList");
    return null;
  }

  if (status === "idle" || !order) {
    return <LoadingComponent />;
  }

  return (
    <View style={ContainerStyle.contentContainer}>
      <Header
        title={`${order.Table.name}, ${order.name}`}
        afterTitle={
          <Pressable
            style={{ paddingLeft: 10 }}
            onPress={() => {
              navigation.navigate("Order/Edit", { id });
            }}
          >
            <MaterialIcons
              name="edit"
              color={theme.colors.textPrimary}
              size={26}
            />
          </Pressable>
        }
        goBack={() => navigation.navigate("OrderList")}
      />

      <Divider />

      <View style={Styles.rowContainer}>
        <Text fontSize="body" fontWeight="bold" color="textPrimary">
          Responsible:{" "}
        </Text>
        <Text fontSize="body" color="textPrimary">
          {order.creator.name}
        </Text>
      </View>

      <Divider />

      <ScrollView>
        <Products
          products={order.OrderProduct}
          navigation={navigation}
          id={id}
        />

        <Button
          text="Send order to kitchen"
          icon="print"
          onPress={() => navigation.navigate("Order/Print", { id })}
          style={{ marginTop: 20, marginBottom: 20 }}
        />

        <Button
          text="Close order"
          loading={loading}
          onPress={onClose}
          icon="shopping-cart"
          style={{ backgroundColor: theme.colors.error, marginBottom: 20 }}
        />
      </ScrollView>
    </View>
  );
};

export default OrderPage;
