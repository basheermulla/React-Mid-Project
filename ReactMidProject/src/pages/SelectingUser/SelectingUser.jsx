import { useState, useEffect, useRef } from 'react';
import './SelectingUser.css';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap-v5';
import DisplayTodosComp from '../DisplayTodos/DisplayTodos';
import DisplayPostsComp from '../DisplayPosts/DisplayPosts';

function SelectingUserComp({ callbackCompletedTodo, callbackAddNewTodo, callbackAddNewPost }) {
    const [showTodos, setShowTodos] = useState(true);
    const [showPosts, setShowPosts] = useState(true);
    const selectingRef = useRef(null);

    const { id } = useParams();

    const addTodo = () => {
        setShowTodos(false);
    }

    const setShow_T = () => {
        setShowTodos(true);
    }

    const addPost = () => {
        setShowPosts(false);
    }

    const setShow_P = () => {
        setShowPosts(true);
    }

    const setCompleted = (todoId) => {
        callbackCompletedTodo(todoId);
    }

    const addNewTodo = (newTodo) => {
        callbackAddNewTodo(newTodo);
    }

    const addNewPost = (newPost) => {
        callbackAddNewPost(newPost);
    }

    useEffect(() => {
        selectingRef.current.focus();
    }, [id])

    return (
        <>
            <div className="col-sm-5">
                <div className='card mb-3 border border-dark rounded-bottom' style={{ borderRadius: '32px', backgroundColor: '#e8eaec' }}>
                    <div className='d-flex justify-content-between'>
                        <h3 className='text-center'> Todos - User {id} </h3>
                        <Button variant="primary" ref={selectingRef} onClick={addTodo}> Add Todo </Button>
                    </div>
                </div>

                <DisplayTodosComp
                    callbackSetCompleted={setCompleted}
                    callbackSetShowTodos={setShow_T}
                    showTodos={showTodos}
                    callbackInsertNewTodo={addNewTodo}
                />
                <div className="card mb-3 mt-5 border border-dark rounded-bottom" style={{ borderRadius: '32px', backgroundColor: '#e8eaec' }}>
                    <div className='d-flex justify-content-between'>
                        <h3 className='text-center'> Posts - User {id} </h3>
                        <Button variant="primary" onClick={addPost}> Add Post </Button>
                    </div>
                </div>
                <DisplayPostsComp
                    callbackSetShowPosts={setShow_P}
                    showPosts={showPosts}
                    callbackInsertNewPost={addNewPost}
                />
                <br />
            </div>

        </>
    )
}

export default SelectingUserComp