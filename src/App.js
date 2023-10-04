import React from "react";
import { TodoCounter } from "./TodoCounter";
import { TodoSearch } from "./TodoSearch";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";

import "./App.css";
import { CreateNewTodoButton } from "./CreateNewTodoButton";

// Componente de react JSX
// elementos de react va en minusculas
// Si comensaran en minusculas serian componentes de react

// const defaultTodos = [
//   { text: "Hacer sopa", completed: false },
//   { text: "Estudiar en platzi ", completed: false },
//   { text: "lavar ropa", completed: false },
//   { text: "Hacer ejercicio", completed: false },
//   { text: "picar cebolla", completed: false },
//   { text: "hola cebolla", completed: false },
//   { text: "mi cebolla", completed: false },
//   { text: "mejor cebolla", completed: false },
//   { text: "caminar cebolla", completed: false },
//   { text: "Usar estados ", completed: false },
// ];

//  localStorage.setItem("TODOS_V1", JSON.stringify(defaultTodos))

// localStorage.removeItem("TODOS_V1");

function App() {
  const localStorageTodos = localStorage.getItem("TODOS_V1");

  let parsedTodos;

  if (!localStorageTodos) {
    localStorage.setItem("TODOS_V1", JSON.stringify([]));
    parsedTodos = [];
  } else {
    parsedTodos = JSON.parse(localStorageTodos);
  }

  const [todos, setTodos] = React.useState(parsedTodos);
  const [searchValue, setSearchValue] = React.useState("");

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  const searchedTodos = todos.filter((todo) => {
    const todoText = todo.text.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return todoText.includes(searchText);
  });

  const saveTodos = (newTodos) => {
    localStorage.setItem("TODOS_V1", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text == text);

    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  return (
    <>
      <TodoCounter completed={completedTodos} total={totalTodos} />

      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />

      <div className="container">
        <TodoList>
          {searchedTodos.map((todo) => (
            <TodoItem
              key={todo.text}
              text={todo.text}
              completed={todo.completed}
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
          ))}
        </TodoList>
        <CreateNewTodoButton />
      </div>
    </>
  );
}

export default App;
