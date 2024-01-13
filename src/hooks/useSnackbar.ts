import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { closeSnackbar, openSnackbar } from "../store/system";
import { useCallback, useState } from "react";

const useSnackbar = () => {
  const dispatch = useDispatch();

  const [closeCallback, setCloseCallback] = useState<NodeJS.Timeout | null>(
    null
  );

  const snackbar = useSelector((state: RootState) => state.system.snackbar);
  const open = useCallback(
    (message: string) => {
      dispatch(openSnackbar(message));
      const callback = setTimeout(() => {
        dispatch(closeSnackbar());
      }, 3000);

      setCloseCallback(callback);
    },
    [dispatch]
  );

  const close = useCallback(() => {
    if (closeCallback) {
      clearTimeout(closeCallback);
    }
    dispatch(closeSnackbar());
  }, [closeCallback, dispatch]);

  return {
    text: snackbar || "",
    isOpen: snackbar !== null,
    open,
    close,
  };
};

export default useSnackbar;
