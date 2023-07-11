/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./UserList.css";

const UserList = () => {
  const history = useHistory();
  const [todos, setTodos] = useState([]);
  const [newText, setNewText] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Authentication token not found");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTodo = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/todos",
        { text: newText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchTodos();
      setNewText("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTodo = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        { text: newText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEditTodoId(null);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchTodos();
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <div className="user-list">
      <h1 className="user-list-title">Todo List</h1>
      <div className="add-todo">
        <input
          type="text"
          value={newText}
          onChange={handleEditInputChange}
          disabled={editTodoId !== null}
          className="add-todo-input"
        />
        <button className="add-todo-button" onClick={handleAddTodo}>
          Add Todo
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            {editTodoId === todo._id ? (
              <>
                <input
                  type="text"
                  value={newText}
                  onChange={handleEditInputChange}
                  className="edit-todo-input"
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
                <span className="todo-item">{todo.text}</span>

                <div className="todo-actions">
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
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./UserList.css";

const UserList = () => {
  const history = useHistory();
  const [todos, setTodos] = useState([]);
  const [newText, setNewText] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [checkedTodos, setCheckedTodos] = useState([]);

  useEffect(() => {
    fetchTodos(currentPage);
  }, [currentPage]);

  const fetchTodos = async (page) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Authentication token not found");
        return;
      }

      const response = await axios.get(
        "https://bakcend-todo.onrender.com/api/todos",
        {
          params: {
            page,
            limit: 5, // Change the limit as per your requirement
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { todos, currentPage, totalPages } = response.data;

      setTodos(todos);
      setCurrentPage(currentPage);
      setTotalPages(totalPages);

      // Set the initial checked status for each todo to false
      const initialCheckedStatus = todos.map(() => false);
      setCheckedTodos(initialCheckedStatus);
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setNewText("");
      fetchTodos(currentPage);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTodo = async (id) => {
    try {
      await axios.put(
        `https://bakcend-todo.onrender.com/api/todos/${id}`,
        { text: newText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEditTodoId(null);
      fetchTodos(currentPage);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`https://bakcend-todo.onrender.com/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchTodos(currentPage);
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

  const handleToggleCheckbox = (index) => {
    const updatedCheckedTodos = [...checkedTodos];
    updatedCheckedTodos[index] = !updatedCheckedTodos[index];
    setCheckedTodos(updatedCheckedTodos);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <div className="user-list">
      <h1 className="user-list-title">Todo List</h1>
      <div className="add-todo">
        <input
          type="text"
          value={newText}
          onChange={handleEditInputChange}
          disabled={editTodoId !== null}
          className="add-todo-input"
        />
        <button className="add-todo-button" onClick={handleAddTodo}>
          Add Todo
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={todo._id} className="todo-item">
            <input
              type="checkbox"
              checked={checkedTodos[index]}
              onChange={() => handleToggleCheckbox(index)}
            />
            <span
              className={`todo-text ${checkedTodos[index] ? "completed" : ""}`}
            >
              {todo.text}
            </span>

            <div className="todo-actions">
              {editTodoId === todo._id ? (
                <>
                  <input
                    type="text"
                    value={newText}
                    onChange={handleEditInputChange}
                    className="edit-todo-input"
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
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
