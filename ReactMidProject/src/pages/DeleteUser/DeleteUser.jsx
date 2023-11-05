import { useState } from 'react';
import './DeleteUser.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap-v5';

function DeleteUserComp({ callbackDeleteUser }) {
    const [user, setUser] = useState(useLocation().state.deleteUser);

    let navigate = useNavigate();

    const handleDelete = () => {
        callbackDeleteUser(user.id);
        routeChange();
    }

    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    return (
        <>
            <div className="col-sm-5">
                <h3> Delete User </h3>
                <Card
                    className="mb-5 text-center bg-light"
                    border="danger"
                >
                    <Card.Body>
                        <Card.Title> Are you sure you want to delete this user? <br /><br /><br /> </Card.Title>
                        <Card.Title style={{ color: 'blue' }}> {user.name} </Card.Title>
                    </Card.Body>
                </Card>
                <Button variant="outline-danger" onClick={routeChange}> Back </Button>
                {' '}
                <Button variant="danger" onClick={handleDelete}> Delete </Button>
            </div>
        </>
    )
}

export default DeleteUserComp