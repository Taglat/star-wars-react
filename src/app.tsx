import { Provider } from "react-redux";
import AppRouter from "./app-router/app-router";
import store from "./redux/store";

export function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}
