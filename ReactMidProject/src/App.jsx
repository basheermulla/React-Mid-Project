import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap-v5';
import { getAll } from './Rest_API/utils';
import HomePageComp from './pages/HomePage/HomePage';
import AddNewUserComp from './pages/AddNewUser/AddNewUser';
import OtherDataComp from './pages/OtherData/OtherData';
import UpdateUserComp from './pages/UpdateUser/UpdateUser';
import DeleteUserComp from './pages/DeleteUser/DeleteUser';
import AddTodoComp from './pages/AddTodo/AddTodo';
import AddPostComp from './pages/AddPost/AddPost';
import UserCardComp from './components/UserCard/UserCard';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

function App() {
  const [usersDB, setUsersDB] = useState([]);
  const [todosDB, setTodosDB] = useState([]);
  const [postsDB, setPostsDB] = useState([]);

  const [usersOnShow, setUsersOnShow] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  // <-------------- To view the search term input -------------->
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  // <-------------- useEffect Search -------------->
  useEffect(() => {
    // Filter users to show
    const results = usersDB.filter(user => {
      const lowerCase_Search = searchTerm.toLowerCase();
      const lowerCase_Name = user.name.toLowerCase();
      const lowerCase_Email = user.email.toLowerCase();
      return lowerCase_Name.includes(lowerCase_Search)|| lowerCase_Email.includes(lowerCase_Search)
    });

    setUsersOnShow(results);
  }, [searchTerm]);

  // <-------------- To navigate through the pages -------------->
  function handleNavigate(e) {
    const nav = e.target.innerText;
    switch (nav) {
      case 'Add':
        navigate("/addNewUser");
        break;
      case 'Update':
        navigate("/updateUser");
        break;
      case 'Delete':
        navigate("/deleteUser");
        break;
      case 'Other Data':
        navigate("/otherData");
        break;
      default:
        navigate("/");
        break;
    }
  }

  // <-------------- To check if the user's todos are completed -------------->
  const checkCompletedTodos = (userId) => {
    const todosUser = todosDB.filter((todo) => todo.userId === userId);
    const notYet = todosUser.find((todo) => !todo.completed);
    return !notYet;
  }

  // <-------------- useEffect USERS -------------->
  useEffect(() => {
    // // storing input name
    // localStorage.setItem("name", JSON.stringify(name));

    // Get All Users =>>  <<--- Rest API called utils.js --->>
    const getAllUsers = async () => {
      const { data } = await getAll(USERS_URL);
      console.log(data);

      // Update state
      setUsersDB(data);
    }

    // Invoke the async function
    getAllUsers();
  }, []);

  // <-------------- useEffect TODOS -------------->
  useEffect(() => {
    // Get All Todos =>>  <<--- Rest API called utils.js --->>
    const getAllTodos = async () => {
      const { data } = await getAll(`${TODOS_URL}`);
      console.log(data);

      // Update state
      setTodosDB(data);
    }

    // Invoke the async function
    getAllTodos();
  }, []);

  // <-------------- useEffect POSTS -------------->
  useEffect(() => {
    // Get All Posts =>>  <<--- Rest API called utils.js --->>
    const getAllPosts = async () => {
      const { data } = await getAll(`${POSTS_URL}`);
      console.log(data);

      // Update state
      setPostsDB(data);
    }

    // Invoke the async function
    getAllPosts();
  }, []);

  return (
    <>
      <div className="p-5 text-white text-center bg-dark" /*style={{ backgroundColor: '#3083cb' }}*/>
        <h1>My React Application</h1>
        <p>This is the My Mid Project of React course!</p>
      </div>
      <nav className="navbar navbar-light bg-danger" /*style={{ backgroundColor: '#aed6f0' }}*/>
        <div className="container-fluid col-sm-4">
          <form className="d-flex">
            <input className="form-control me-5" type="search" placeholder="Search" aria-label='Search' onChange={handleSearch} />
          </form>
        </div>
        <div className="container-fluid col-sm-8">
          <Button variant="light" onClick={handleNavigate}> Add </Button><br /><br />
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-7 border border-dark" style={{ borderRadius: '64px' }}>
            <h2>My Users</h2>
            {
              usersOnShow.map((user) => {
                return <UserCardComp userData={user} key={user.id} callbackNavigate={handleNavigate} isUnCompleted={checkCompletedTodos(user.id)} />
              })
            }
          </div>
          <Routes>
            <Route path='/' element={<HomePageComp />} />
            <Route path='/addNewUser' element={<AddNewUserComp />} />
            <Route path='/updateUser' element={<UpdateUserComp />} />
            <Route path='/deleteUser' element={<DeleteUserComp />} />
            <Route path='/otherData' element={<OtherDataComp />} >
              <Route path='/otherData/addTodo' element={<AddTodoComp />} />
              <Route path='/otherData/addPost' element={<AddPostComp />} />
            </Route>
          </Routes>
        </div>
      </div>

      <div className="mt-5 p-4 text-white text-center bg-dark" /*style={{ backgroundColor: '#3083cb' }}*/>
        <h4>Footer</h4>
      </div>
    </>
  )
}

export default App
