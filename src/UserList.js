import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserList.css"; // Import the CSS file for styling

const UserList = () => {
  const [todos, setTodos] = useState([]);
  const [newText, setNewText] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setIsLoggedIn(true);
      fetchTodos();
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [isLoggedIn, token]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://bakcend-todo.onrender.com/api/todos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTodo = async () => {
    try {
      await axios.post(
        "https://bakcend-todo.onrender.com/api/todos",
        { text: newText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTodos(); // Refresh the todo list
      setNewText("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTodo = async (id) => {
    try {
      const response = await axios.put(
        `https://bakcend-todo.onrender.com/api/todos/${id}`,

        { text: newText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // Optional: Log the updated todo item
      fetchTodos(); // Refresh the todo list
      setEditTodoId(null); // Clear the edit state
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`https://bakcend-todo.onrender.com/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTodos(); // Refresh the todo list
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditInputChange = (e) => {
    setNewText(e.target.value);
  };

  const handleEditButtonClick = (id) => {
    setEditTodoId(id);
    const todoToUpdate = todos.find((todo) => todo._id === id);
    setNewText(todoToUpdate.text);
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username: "",
        password: "",
      });
      setToken(response.data);
      setIsLoggedIn(true);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken("");
    setTodos([]);
  };

  return (
    <div className="user-list-container">
      <h1 className="user-list-title">Todo List</h1>
      {isLoggedIn ? (
        <>
          <div className="add-todo-container">
            <input
              type="text"
              value={newText}
              onChange={handleEditInputChange}
              disabled={editTodoId !== null}
              className="todo-input"
            />
            <button className="add-todo-button" onClick={handleAddTodo}>
              Add Todo
            </button>
          </div>
          {todos.length === 0 ? (
            <p>No todos found</p>
          ) : (
            <ul>
              {todos.map((todo) => (
                <li key={todo._id}>
                  {editTodoId === todo._id ? (
                    <>
                      <input
                        type="text"
                        value={newText}
                        onChange={handleEditInputChange}
                      />
                      <button
                        className="save-todo-button"
                        onClick={() => handleEditTodo(todo._id)}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      {todo.text}
                      <button
                        className="edit-todo-button"
                        onClick={() => handleEditButtonClick(todo._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-todo-button"
                        onClick={() => handleDeleteTodo(todo._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      )}
    </div>
  );
};

export default UserList;
