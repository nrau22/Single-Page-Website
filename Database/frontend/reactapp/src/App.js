import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [users, setUsers] = useState([]); // Käyttäjät
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");

  // 🔹 Hakee käyttäjätiedot backendistä
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Virhe haettaessa käyttäjiä:", error);
    }
  };

  // 🔹 Lisää käyttäjän tietokantaan
  const addUser = async () => {
    if (!age || !city) {
      alert("Täytä kaikki kentät!");
      return;
    }

    try {
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, city }),
      });

      setAge("");
      setCity("");
      fetchUsers(); // Päivitä lista
    } catch (error) {
      console.error("Virhe lisättäessä käyttäjää:", error);
    }
  };

  // 🔹 Poistaa käyttäjän ID:n perusteella
  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:3000/users/${id}`, { method: "DELETE" });
      fetchUsers(); // Päivitä lista
    } catch (error) {
      console.error("Virhe poistettaessa käyttäjää:", error);
    }
  };

  // 🔹 Hakee käyttäjätiedot, kun sovellus käynnistyy
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">SQLite User Management</h2>

      {/* 🔹 Lomake uuden käyttäjän lisäämiseen */}
      <div className="mb-3">
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addUser}>
          Add User
        </button>
      </div>

      {/* 🔹 Taulukko käyttäjistä */}
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Age</th>
            <th>City</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No users found</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.age}</td>
                <td>{user.city}</td>
                <td>{user.created_at}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(user.id)}
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
