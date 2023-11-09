import { useEffect, useState } from 'react';
import './DisplayTodos.css';
import { useLocation } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap-v5';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

function DisplayTodosComp({ callbackSetCompleted, callbackSetShowTodos, showTodos, callbackInsertNewTodo }) {
    const [user, setUser] = useState({});
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [maxTodoId, setMaxTodoId] = useState('');

    const { state } = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        const todo = {
            userId: user.id,
            title: newTitle,
            completed: false
        }

        console.log(todo);

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your todo has been added",
            showConfirmButton: false,
            timer: 1500
        }).then((result) => {
            console.log(maxTodoId);
            if (result.dismiss) {
                setNewTitle('')
                e.target.reset();
                callbackInsertNewTodo(todo);
                callbackSetShowTodos();
                addNewTodo(todo);
            }
        });
    }

    // <-------------- Add New Todo -------------->
    const addNewTodo = (newTodo) => {
        let newId = 1;
        if (todos[todos.length - 1]) {
            newId = maxTodoId + 1;
        }
        const newTodo_Obj = { ...newTodo, id: newId };
        // Update state
        state.maxTodoId = maxTodoId + 1;
        state.todosUser = [...todos, newTodo_Obj];
    }

    useEffect(() => {
        setUser(state?.selectedUser);
        setTodos(state?.todosUser);
        setMaxTodoId(state?.maxTodoId)
    }, [state?.todosUser]);

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
                                    <Button
                                        variant="warning"
                                        hidden={todo.completed} onClick={() => {
                                            callbackSetCompleted(todo.id);
                                            todo.completed = true;
                                        }}
                                    > Mark Completed</Button>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className="card border border-dark" hidden={showTodos}>
                <Form onSubmit={handleSubmit} >
                    <Form.Group as={Row} className="mb-3" controlId="Form.ControlInputTitle">
                        <Form.Label column sm="3">
                            Title:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                required
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            className=''
                            variant="outline-danger"
                            onClick={(e) => {
                                callbackSetShowTodos();
                                setNewTitle('');
                            }}
                        > Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                        > Add
                        </Button>
                    </div>
                </Form >
            </div>
        </>
    )
}

export default DisplayTodosComp