import React, { useState, useEffect } from "react";   // React + hooks

function App() {
  // State for list of users
  const [users, setUsers] = useState([]);

  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // State for edit mode
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from backend on load
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Add new user
  const addUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const newUser = await res.json();
    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  };

  // Update user
  const updateUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/users/${editingUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const updatedUser = await res.json();
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setEditingUser(null);
    setName("");
    setEmail("");
  };

  // Delete user
  const deleteUser = async (id) => {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    setUsers(users.filter((u) => u.id !== id));
  };

  // Fill form for editing
  const startEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20, maxWidth: 600, margin: "auto" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Ali Haider Resume Project A</h1>

      <form onSubmit={editingUser ? updateUser : addUser} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: 8, marginRight: 10, width: "40%" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 8, marginRight: 10, width: "40%" }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            background: editingUser ? "#f39c12" : "#27ae60",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {editingUser ? "Update" : "Add"}
        </button>
      </form>

      <table width="100%" border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead style={{ background: "#34495e", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => startEdit(user)}
                    style={{
                      marginRight: 10,
                      background: "#2980b9",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    style={{
                      background: "#c0392b",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
