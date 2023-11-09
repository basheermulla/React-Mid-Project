import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Button, Container, Navbar } from 'react-bootstrap-v5';
import { getAll } from './Rest_API/utils';
import HomePageComp from './pages/HomePage/HomePage';
import AddNewUserComp from './pages/AddNewUser/AddNewUser';
import UpdateUserComp from './pages/UpdateUser/UpdateUser';
import UserCardComp from './components/UserCard/UserCard';
import SelectingUserComp from './pages/SelectingUser/SelectingUser';
import DisplayTodosComp from './pages/DisplayTodos/DisplayTodos';
import DisplayPostsComp from './pages/DisplayPosts/DisplayPosts';
import { POSTS_URL, TODOS_URL, USERS_URL } from './config/constants';
import 'sweetalert2/src/sweetalert2.scss';
import reactLogo from './assets/react.svg';
import InvalidPath from './pages/InvalidPath/InvalidPath';

function App() {
  const [usersDB, setUsersDB] = useState([]);
  const [todosDB, setTodosDB] = useState([]);
  const [postsDB, setPostsDB] = useState([]);
  const [userIdColoredOrange, setUserIdColoredOrange] = useState('');
  const [usersOnShow, setUsersOnShow] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [invalidPath, setInvalidPath] = useState(false);

  const navigate = useNavigate();

  // <-------------- To navigate through the pages -------------->
  function handleNavigate(e, obj) {
    const nav = e.target.innerText;
    if (nav !== `ID: ${obj.id}`) {
      setUserIdColoredOrange('');
    }
    switch (nav) {
      case 'Add': // <--- Add New User --->
        navigate("/addNewUser");
        break;
      case 'Update': // <--- Update User --->
        let updatePath = `updateUser`;
        const updateUser = obj;
        const updateData = { state: { updateUser } };
        navigate(`/${updatePath}`, updateData);
        break;
      case 'Delete': // <--- Delete User --->
        deleteUserFromUsersDB(obj.id);
        break;
      case `ID: ${obj.id}`: // <--- Selecting User - Posts & Todos Are Presented --->
        let selectingUserPath = `selectingUser`;
        const selectedUser = obj;
        const postsUser = postsDB.filter((post) => post.userId === selectedUser.id);
        const todosUser = todosDB.filter((todo) => todo.userId === selectedUser.id);        
        const maxPostId = postsDB.reduce((prev, current) => (prev && prev.id > current.id) ? prev : current, 0).id;
        const maxTodoId = todosDB.reduce((prev, current) => (prev && prev.id > current.id) ? prev : current, 0).id;
        controlRegionColoredOrange(selectedUser.id);
        const selectedData = {
          state: {
            selectedUser,
            postsUser,
            todosUser,
            maxPostId,
            maxTodoId
          }
        };
        navigate(`/${selectingUserPath}/${selectedUser.id}`, selectedData);
        break;
      default:
        setInvalidPath(false);
        navigate('/', {}); // <--- Home Page --->
        break;
    }
  }

  // <-------------- To check if the user's todos are completed -------------->
  const checkCompletedTodos = (userId) => {
    const todosUser = todosDB.filter((todo) => todo.userId === userId);
    const notYet = todosUser.find((todo) => !todo.completed);
    console.log(!notYet);
    return !notYet;
  }

  // <-------------- To control the Region Colored Orange  -------------->
  const controlRegionColoredOrange = (userId) => {
    // Update state
    setUserIdColoredOrange(userId);
  }

  // <-------------- To view the search term input -------------->
  const handleSearch = (e) => {
    // Update state
    setSearchTerm(e.target.value);
  }

  // <-------------- Update Data Base after UPDATE a particular User -------------->
  const updateUsersDB = (newUser) => {
    const newStateUsersDB = usersDB.map((user) => {
      if (user.id === newUser.id) {
        return newUser;
      } else {
        return user;
      }
    });
    // Update state
    setUsersDB(newStateUsersDB);
    setUsersOnShow(newStateUsersDB);
  }

  // <-------------- Update Data Base after DELETE a particular User and all user's data like todos and posts -------------->
  const deleteUserFromUsersDB = (userId) => {
    const newStateUsersDB = usersDB.filter((user) => user.id !== userId);
    const newStateTodosDB = todosDB.filter((todo) => todo.userId !== userId);
    const newStatePostsDB = postsDB.filter((post) => post.userId !== userId);
    // Update state
    setUsersDB(newStateUsersDB);
    setUsersOnShow(newStateUsersDB);
    setTodosDB(newStateTodosDB);
    setPostsDB(newStatePostsDB);
    navigate("/", {});
  }

  // <-------------- Update Completed Todo by todoId -------------->
  const updateCompletedTodo = (todoId) => {
    console.log(todoId);
    const todo_Completed_Index = todosDB.findIndex((todo) => todo.id === todoId);
    let newStateTodosDB = [...todosDB];
    if (!newStateTodosDB[todo_Completed_Index]) {
      console.log(newStateTodosDB[todo_Completed_Index]);
    }
    newStateTodosDB[todo_Completed_Index].completed = true;//////////////////////////////////////////////////////////
    const userId = newStateTodosDB[todo_Completed_Index].userId
    const indicate_Completed_AllTodos_User = newStateTodosDB.find((todo) => todo.completed === false && todo.userId === userId);
    console.log(indicate_Completed_AllTodos_User);
    setTodosDB(newStateTodosDB);
  }

  // <-------------- Add New Todo -------------->
  const addNewTodo = (newTodo) => {
    let newId = 1;
    if (todosDB[todosDB.length - 1]) {
      newId = todosDB[todosDB.length - 1].id + 1;
    }

    const newTodo_Obj = { ...newTodo, id: newId };
    // Update state
    setTodosDB([...todosDB, newTodo_Obj]);
  }

  // <-------------- Add New Post -------------->
  const addNewPost = (newPost) => {
    let newId = 1;
    if (postsDB[postsDB.length - 1]) {
      newId = postsDB[postsDB.length - 1].id + 1;
    }
    const newPost_Obj = { ...newPost, id: newId };
    // Update state
    setPostsDB([...postsDB, newPost_Obj]);
  }

  // <-------------- Add New Post -------------->
  const addNewUser = (newUser) => {
    let newId = 1;
    if (usersDB[usersDB.length - 1]) {
      newId = usersDB[usersDB.length - 1].id + 1;
    }
    const newUser_Obj = { ...newUser, id: newId }
    // Update state
    setUsersDB([...usersDB, newUser_Obj]);
    setUsersOnShow([...usersDB, newUser_Obj]);
  }

  // <-------------- useEffect Search -------------->
  useEffect(() => {
    // Filter users to show
    const results = usersDB.filter(user => {
      const lowerCase_Search = searchTerm.toLowerCase();
      const lowerCase_Name = user.name.toLowerCase();
      const lowerCase_Email = user.email.toLowerCase();
      return lowerCase_Name.includes(lowerCase_Search) || lowerCase_Email.includes(lowerCase_Search)
    });

    setUsersOnShow(results);
  }, [searchTerm]);

  // <-------------- useEffect Get All USERS -------------->
  useEffect(() => {
    // Get All Users =>>  <<--- Rest API called utils.js --->>
    const getAllUsers = async () => {
      const { data } = await getAll(USERS_URL);
      console.log(data);

      // Update state
      setUsersDB(data);
      setUsersOnShow(data);
    }

    // Invoke the async function
    getAllUsers();
  }, []);

  // <-------------- useEffect Get All TODOS -------------->
  useEffect(() => {
    // Get All Todos =>>  <<--- Rest API called utils.js --->>
    const getAllTodos = async () => {
      const { data } = await getAll(`${TODOS_URL}`);
      // console.log(data);

      // Update state
      setTodosDB(data);
    }

    // Invoke the async function
    getAllTodos();
  }, []);

  // <-------------- useEffect Get All POSTS -------------->
  useEffect(() => {
    // Get All Posts =>>  <<--- Rest API called utils.js --->>
    const getAllPosts = async () => {
      const { data } = await getAll(`${POSTS_URL}`);
      // console.log(data);

      // Update state
      setPostsDB(data);
    }

    // Invoke the async function
    getAllPosts();
  }, []);

  return (
    <>
      {/*---------------------------------------- Header ----------------------------------------*/}
      <div className="p-1 text-white text-center bg-dark">
        <Container>
          <Navbar.Brand className='justify-content-end flex-grow-1'>
            <div
              className='d-inline-block'
              onClick={(e) => handleNavigate(e, { id: -1 })}
              style={{ cursor: 'pointer' }}
            >
              <img alt="" src={reactLogo} className="d-inline-block align-top logo react" />{' '}
              <h2>My React Application</h2>
              <p>This is the My Mid Project of React course!</p>
            </div>
          </Navbar.Brand>
        </Container>
      </div>
      {/*---------------------------------------- Navbar ----------------------------------------*/}
      <nav className="navbar navbar-light bg-danger" >
        <div className="container-fluid col-sm-4">
          <form className="d-flex">
            <input className="form-control me-5" type="search" placeholder="Search" onChange={handleSearch} />
          </form>
        </div>
        <div className="container-fluid col-sm-8">
          <Button variant="info" onClick={(e) => handleNavigate(e, { id: -1 })}> <b>Add</b> </Button><br /><br />
        </div>
      </nav>
      {/*---------------------------------------- Container ----------------------------------------*/}
      <div className="container mt-5" hidden={invalidPath}>
        <div className="row">
          <div className="col-sm-7">
            <div className='card mb-3 border border-dark rounded-bottom' style={{ borderRadius: '32px', backgroundColor: '#e8eaec' }}>
              <div className='d-flex justify-content-center'>
                <h3> My Users </h3>
              </div>
            </div>
            <div className='card mb-3 border border-dark'>
              {
                (usersOnShow && usersOnShow.length > 0) ? usersOnShow.map((user) => {
                  return <UserCardComp
                    userData={user}
                    key={user.id}
                    callbackNavigate={handleNavigate}
                    isUnCompleted={checkCompletedTodos(user.id)}
                    userIdColoredOrange={userIdColoredOrange}
                  />
                }) : 'No Users Found'
              }
            </div>
          </div>
          <Routes>
            <Route path='/' element={<HomePageComp />} />
            <Route path='/addNewUser' element={<AddNewUserComp callbackNewUser={addNewUser} />} />
            <Route path='/updateUser' element={<UpdateUserComp callbackUpdateUser={updateUsersDB} />} />
            <Route path='*' element={<InvalidPath callbackInvalidPath={(path) => setInvalidPath(path)} />} />
            <Route
              path='/selectingUser/:id'
              element={<SelectingUserComp
                callbackCompletedTodo={updateCompletedTodo}
                callbackAddNewTodo={addNewTodo}
                callbackAddNewPost={addNewPost}
              />
              }>
              <Route path='displayTodos' element={<DisplayTodosComp />} />
              <Route path='displayPosts' element={<DisplayPostsComp />} />
            </Route>

          </Routes>
        </div>
      </div>
      {/*---------------------------------------- Footer ----------------------------------------*/}
      <div className="mt-5 p-4 text-white text-center bg-dark" hidden={invalidPath}>
        <h4>Footer</h4>
      </div>
    </>
  )
}

export default App