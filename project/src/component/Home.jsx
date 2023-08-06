import React, { useState, useEffect } from 'react';

// add router
import { useNavigate } from 'react-router-dom';

// add UserAuthContext
import { useUserAuth } from '../context/UserAuthContext';

// add react-bootstrap
import { Button } from 'react-bootstrap';

// add firebase/firestore
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// add db from firestore
import { db } from '../firebase';

function Home() {

  const { logOut, user } = useUserAuth();
  console.log(user);
  const navigate = useNavigate();

  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // logOut function
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  }

  // ad data to database
  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todo: newTodo,
        id: user.uid
      })
      console.log("Document written with ID: ", docRef.id)
      setNewTodo("");
    } catch (e) {
      console.error("error adding document: ", e);
    }
  }

  // show data from database
  const fetchTodos = async () => {

    try {
      const querySnapshot = await getDocs(
        query(collection(db, "todos"), where("id", "==", user.uid))
      );
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
      console.log(newData);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  // call fetchTodos()
  useEffect(() => {
    fetchTodos();
  }, [user]); 

  return (

    <div>
      <div>
        <h2>Welcome to the homepage</h2>
        <p>Hi, {user.email}</p>
        <p>UID: {user.uid}</p>
        <Button onClick={handleLogout} variant='danger'>Logout</Button>
      </div>

      <br /> 
      <br /> 
      <br /> 
      <br />

      <div>
        <h1 className='title'>Todo-App</h1>
        <input
          type="text"
          placeholder='What do you have to do today'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type='submit' onClick={addTodo} >
          Submit
        </button>

        {todos.map((todo) => (
          <div key={todo.id}>
            <p>{todo.todo}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;
