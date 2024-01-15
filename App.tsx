import Main from "./src/components/Main";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { ErrorBoundary } from "@sentry/react-native";
import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://9111e6f4727577180100df88a4a6bcd0@o1385793.ingest.sentry.io/4506576006938624",
  enableInExpoDevelopment: true,
  debug: true,
});

export default function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    </Provider>
  );
}
