import { useState } from 'react';
import './UpdateUser.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap-v5';

function UpdateUserComp({ callbackUpdateUser }) {
    const [user, setUser] = useState(useLocation().state.updateUser);
    
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        callbackUpdateUser(user);
        routeChange();
    }

    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    return (
        <>
            <div className="col-sm-5 border border-">
                <h3> Update User </h3>
                <div className='row'>
                    <Form onSubmit={handleSubmit}>
                        <div className='card'>
                            <Form.Group className="mb-3" onChange={(e) => setUser({ ...user, name: e.target.value })} controlId="exampleForm.ControlInput1">
                                <Form.Label> Name </Form.Label>
                                <Form.Control required type="text" placeholder="Name" defaultValue={user['name']} />
                            </Form.Group>
                            <Form.Group className="mb-3" onChange={(e) => setUser({ ...user, email: e.target.value })} controlId="exampleForm.ControlInput1">
                                <Form.Label> Email </Form.Label>
                                <Form.Control required type="email" placeholder="Email" defaultValue={user['email']} />
                            </Form.Group>
                            <Form.Group className="mb-3" onChange={(e) => setUser({ ...user, address: { ...user.address, street: e.target.value } })} controlId="exampleForm.ControlInput1">
                                <Form.Label> Street </Form.Label>
                                <Form.Control required type="text" placeholder="Street" defaultValue={user.address['street']} />
                            </Form.Group>
                            <Form.Group className="mb-3" onChange={(e) => setUser({ ...user, address: { ...user.address, city: e.target.value } })} controlId="exampleForm.ControlInput1">
                                <Form.Label> City </Form.Label>
                                <Form.Control required type="text" placeholder="City" defaultValue={user.address['city']} />
                            </Form.Group>
                            <Form.Group className="mb-3" onChange={(e) => setUser({ ...user, address: { ...user.address, zipcode: e.target.value } })} controlId="exampleForm.ControlInput1">
                                <Form.Label> Zip Code </Form.Label>
                                <Form.Control required type="text" placeholder="Zip Code" defaultValue={user.address['zipcode']} />
                            </Form.Group>
                            <br />
                        </div>
                        <br />
                        <Button variant="outline-danger" onClick={routeChange}> Back </Button>
                        {' '}
                        <Button variant="outline-primary" type="submit"> Update </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default UpdateUserComp