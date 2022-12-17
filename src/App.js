import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;

    const user = { name, email, phone };
    // sending data to server //
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log('success', data);
      })

  }
  return (
    <div>
      <div
        style={{ width: "500px", border: "1px solid gray", margin: "10px auto", textAlign: "center", padding: "10px" }}>
        <>Add New User</>
        <form onSubmit={handleAddUser}>
          <div>
            <input
              style={{ width: "400px", height: "20px", margin: "5px" }} type="text" name="name" placeholder='Name' required />
          </div>
          <div>
            <input
              style={{ width: "400px", height: "20px", margin: "5px" }} type="email" name="email" placeholder='Email' required />
          </div>
          <div>
            <input
              style={{ width: "400px", height: "20px", margin: "5px" }} type="number" name="phone" placeholder='Phone' required />
          </div>
          <input type="submit" value="Add User" />
        </form>
      </div>
      <h2>Data amount: {users.length}</h2>
      <ul>
        {
          users.map(user => <li
            key={user.id}
          ><p><strong> Id: {user.id}</strong></p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </li>)
        }
      </ul>
    </div>
  );
}

export default App;
