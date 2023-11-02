
import { useEffect, useState } from 'react';
import { Form, Button, Row } from 'react-bootstrap-v5'
import './TodoCard.css'
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

function TodoCardComp() {
    const [flag, setFlag] = useState(false);
    const location = useLocation();
    
    let navigate = useNavigate();
    console.log('Todo Card Page');
    const routeChange = () => {
        setFlag(true);
        let path = `/otherData/addTodo`;
        navigate(path);
    }

    useEffect(() => {
        if (location.state) {
            setFlag(false);
        }
    })

    return (
        <>
            {!flag
                ?
                <div className="row">
                    <h3> Todo Card </h3>
                    <Button variant="success" onClick={routeChange}> Add Todo </Button>
                    <h5>Title todo [String]</h5>
                    <h5> Completed [boolean]</h5>
                    <Button variant="success"> Mark Completed</Button>
                </div>
                :
                <div className="row">
                    <Outlet />
                </div>
            }

        </>
    )
}

export default TodoCardComp