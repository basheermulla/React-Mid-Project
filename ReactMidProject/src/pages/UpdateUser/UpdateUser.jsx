import { useState } from 'react';
import './UpdateUser.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap-v5';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';


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

        Swal.fire({
            title: "Do you want to save the changes?",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Save",
            cancelButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            console.log(result);
            if (result.value) {
                callbackUpdateUser(user);
                routeChange();
                Swal.fire("Saved!", "", "success");
            } else if (result.dismiss) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    return (
        <>
            <div className="col-sm-5">
                <div className='card mb-3 border border-dark rounded-bottom' style={{ borderRadius: '32px', backgroundColor: '#e8eaec' }}>
                    <div className='d-flex justify-content-center'>
                        <h3> Update User </h3>
                    </div>
                </div>
                <div className='row'>
                    <Form onSubmit={handleSubmit}>
                        <div className='card border border-dark'>
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
                        <Button variant="primary" type="submit"> Update </Button>
                    </Form>
                </div>
            </div >
        </>
    )
}

export default UpdateUserComp