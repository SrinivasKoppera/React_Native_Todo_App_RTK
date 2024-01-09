import {
  StyleSheet,
  TextInput,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  addTodo,
  deleteTodoAction,
  getSingleTodoAction,
  updateTodoAction,
} from "./Redux/todosSlice";

const Todos = () => {
  const todos = useSelector((state) => state.todos.todos);
  // console.log("This is todos : ", todos);
  let singleTodo = useSelector((state) => state.todos.singleTodo);
  const dispatch = useDispatch();
  const [todo, setTodo] = useState({
    todo: "",
  });

  const handleOnChangeText = (text) => {
    const newTodo = { ...todo, todo: text };
    setTodo(newTodo);
  };

  useEffect(() => {
    setTodo((prevTodo) => ({ ...prevTodo, ...singleTodo }));
  }, [singleTodo]);

  const handleOnPress = () => {
    if (todo.todo !== "") {
      if (todo.id !== undefined) {
        dispatch(updateTodoAction(todo));
      } else {
        dispatch(addTodo(todo));
      }
      setTodo({
        todo: "",
      });
    } else {
      Alert.alert("Please Enter Todo");
    }
  };

  const deleteTodo = (index) => {
    dispatch(deleteTodoAction(index));
  };

  const updateTodo = (index) => {
    dispatch(getSingleTodoAction(index));
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.singleTodoCard} key={index}>
        <Text style={{ fontWeight: "900" }}>{index + 1}.</Text>
        <Text style={styles.todoText} numberOfLines={1} ellipsizeMode="tail">
          {item.todo}
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.updateBtnStyle}
            onPress={() => updateTodo(index)}
          >
            <Text style={styles.updateBtnTextStyle}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteBtnStyles}
            onPress={() => deleteTodo(index)}
          >
            <Text style={styles.deleteBtnTextStyle}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.todoContainer}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.TextInputStyles}
          placeholder="Enter Todo here"
          value={todo.todo}
          // maxLength={40}
          onChangeText={(text) => handleOnChangeText(text)}
        />
        <Icon
          name="plus"
          size={25}
          style={styles.plusIcon}
          color="#6e6c67"
          onPress={() => handleOnPress()}
        />
      </View>
      {todos.length === 0 ? (
        <View style={styles.noTodosContainer}>
          <Text style={styles.noTodosText}>You have No TODOs</Text>
        </View>
      ) : (
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default Todos;

const styles = StyleSheet.create({
  todoContainer: {
    justifyContent: "center",
  },
  textInputContainer: {
    margin: 30,
    marginTop: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "#b8b5ad",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  TextInputStyles: {
    // borderWidth: 1,
    width: "90%",
  },
  noTodosContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
  },
  noTodosText: {
    fontSize: 20,
    fontWeight: "800",
  },
  singleTodoCard: {
    margin: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    // borderColor: "#b8b5ad",
  },
  todoText: {
    fontWeight: "900",
    // borderWidth: 1,
    width: "70%",
    marginRight: 2,
    marginLeft: 2,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  updateBtnStyle: {
    backgroundColor: "#077df2",
    padding: 5,
    borderRadius: 5,
    marginRight: 3,
  },
  updateBtnTextStyle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  deleteBtnStyles: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  deleteBtnTextStyle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
