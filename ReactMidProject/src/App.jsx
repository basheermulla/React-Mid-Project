import { useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap-v5'
import HomePageComp from './pages/HomePage/HomePage';
import AddNewUserComp from './pages/AddNewUser/AddNewUser';
import OtherDataComp from './pages/OtherData/OtherData';
import UpdateUserComp from './pages/UpdateUser/UpdateUser';
import DeleteUserComp from './pages/DeleteUser/DeleteUser';
import AddTodoComp from './pages/AddTodo/AddTodo';
import AddPostComp from './pages/AddPost/AddPost';

function App() {
  const [count, setCount] = useState(0)

  const navigate = useNavigate();

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

  return (
    <>
      <div className="p-5 text-white text-center" style={{ backgroundColor: '#3083cb' }}>
        <h1>My React Application</h1>
        <p>This is the My Mid Project of React course!</p>
      </div>
      <nav className="navbar navbar-light" style={{ backgroundColor: '#aed6f0' }}>
        <div className="container-fluid col-sm-4">
          <form className="d-flex">
            <input className="form-control me-5" type="search" placeholder="Search" aria-label="Search" />
          </form>
        </div>
        <div className="container-fluid col-sm-8">
          <Button variant="primary" onClick={handleNavigate}> Add </Button><br /><br />
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-7">
            <h2>My Users</h2>
            <div className='card'>
              <h5>ID [Number]</h5>
              <h5> Name [String]</h5>
              <h5> Email [String]</h5>
              <div className='row'>
                <div className='col-sm-4'>
                  <Button variant="primary" onClick={handleNavigate}> Other Data </Button><br /><br />
                </div>
                <div className='col-sm-2'>
                  <Button variant="primary" onClick={handleNavigate}> Update </Button><br /><br />
                </div>
                <div className='col-sm-2'>
                  <Button variant="primary" onClick={handleNavigate}> Delete </Button><br /><br />
                </div>
              </div>
              <div>
                <h5> Street [String]</h5>
                <h5> City [String]</h5>
                <h5>Zip Code [Number]</h5>
              </div>
            </div>
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

      <div className="mt-5 p-4 text-white text-center" style={{ backgroundColor: '#3083cb' }}>
        <h4>Footer</h4>
      </div>
    </>
  )
}

export default App
