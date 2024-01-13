import useSnackbar from "../hooks/useSnackbar";
import { Snackbar as PaperSnackbar } from "react-native-paper";

const Snackbar = () => {
  const { text, isOpen, close } = useSnackbar();

  return (
    <PaperSnackbar
      style={{ opacity: 1, backgroundColor: "#000", zIndex: 1000 }}
      visible={isOpen}
      onDismiss={close}
      action={{
        label: "Dismiss",
        onPress: close,
      }}
    >
      {text}
    </PaperSnackbar>
  );
};

export default Snackbar;
