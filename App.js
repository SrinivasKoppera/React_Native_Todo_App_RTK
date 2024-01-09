import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Todos from "./components/TodosScreen";
import store from "./components/Redux/toolkitStore";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <View>
        <Todos />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // marginTop: 15,
  },
});
