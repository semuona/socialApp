import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/users/list");

      console.log("useeffect response", response);

      setUsers([...response.data]);
    };

    getData();
  }, []);

  const handleRegister = async () => {
    const response = await axios.post("/users/register", { email, address });

    console.log("response is", response);

    if (response.data.success) {
      console.log("users are", users);
      setUsers([...users, response.data.newUser]);
    }
  };

  const handleDelete = async (id) => {
    const response = await axios.delete("/users/delete?id=" + id);

    console.log("handle delete response is", response);

    if (response.data.success) {
      // find the user in the state and delete it

      const oldUsers = [...users];

      const idx = oldUsers.findIndex((item) => item._id == id);

      if (idx > -1) oldUsers.splice(idx, 1);

      setUsers([...oldUsers]);
    } else {
      alert("Error deleting user");
    }
  };

  return (
    <div className="App">
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={address} onChange={(e) => setAddress(e.target.value)} />

      <div>
        <button onClick={handleRegister}>Register</button>
      </div>

      <div>
        {users?.map((item) => (
          <div key={item._id}>
            {item.email}{" "}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
