import { useEffect, useState } from 'react';
import './DisplayTodos.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap-v5';

function DisplayTodosComp({ callbackSetShowTodos, showTodos }) {
    const [user, setUser] = useState({});
    const [todos, setTodos] = useState([]);
    // const [showTodos, setShowTodos] = useState(true);

    const location = useLocation().state;

    const navigate = useNavigate();

    useEffect(() => {
        setUser(location.selectedUser);
        setTodos(location.todosUser);
        console.log(location.selectedUser);
        console.log(location.todosUser);
    }, [location.selectedUser.id])

    return (
        <>
            <div className="card border border-dark" hidden={!showTodos}>
                {
                    todos && todos.map((todo) => {
                        return <div className="card mb-4" key={todo.id}>
                            <div className='row'>
                                <label className='col-sm-3'> Title: </label>
                                <div className="col-sm-9">
                                    <label> {todo.title} </label>
                                </div>
                            </div>
                            <div className='row'>
                                <label className='col-sm-4 col-form-label'> Completed: </label>
                                <div className="col-sm-2">
                                    <label className='col-form-label'> {todo.completed.toString()} </label>
                                </div>
                                <div className="col-sm-6">
                                    <Button variant="warning" hidden={todo.completed}> Mark Completed</Button>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>

            <div className="card border border-dark" hidden={showTodos}>
                <div className="card mb-4">
                    <div className='row'>
                        <label className='col-sm-3'> Title: </label>
                        <div className="col-sm-9">
                            <input className="form-control-static" type="text" value={/*user.name || ''*/'Add to do'} readOnly />
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end gap-2'>
                    <Button
                        className=''
                        variant="outline-danger"
                        onClick={(e) => {
                            callbackSetShowTodos()
                            // routeChange()
                        }}> Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={(e) => {
                            callbackSetShowTodos()
                            // routeChange()
                        }}> Add
                    </Button>
                </div>
            </div>

        </>
    )
}

export default DisplayTodosComp