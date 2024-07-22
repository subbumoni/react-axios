import { useState, useEffect } from "react";
import axios from "axios";
import UserModal from "./UserModal";






const App = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setSelectedUser(user);
    setFormData(user || { name: "", email: "", phone: "" });
    setShow(true);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("All fields are required");
      return;
    }

    try {
      if (selectedUser) {
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${selectedUser.id}`,
          formData
        );
        setUsers(
          users.map((user) =>
            user.id === selectedUser.id ? response.data : user
          )
        );
      } else {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          {
            ...formData,
            id: users.length + 1,
          }
        );
        setUsers([...users, response.data]);
      }
      handleClose();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center" id="title">
        React Axios Task
      </h1>
      <div className="d-flex justify-content-start mb-4">
        <button
          className="btn btn-primary shadow"
          onClick={() => handleShow(null)}
        >
          Add User
        </button>
      </div>
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-md-4 mb-4">
            <div className="card user-card shadow">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                <p className="card-text">{user.phone}</p>
                <div className="btn-group d-flex justify-content-end">
                  <button
                    className="btn btn-warning me-2 "
                    onClick={() => handleShow(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <UserModal
        show={show}
        handleClose={handleClose}
        formData={formData}
        setFormData={setFormData}
        handleSave={handleSave}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default App;