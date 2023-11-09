import { useState, useEffect, useRef } from 'react';
import './UpdateUser.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap-v5';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

function UpdateUserComp({ callbackUpdateUser }) {
    const [user, setUser] = useState(useLocation().state.updateUser);
    const updateRef = useRef(null);

    const location = useLocation().state;

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
            console.log(result);
            if (result.value) {
                callbackUpdateUser(user);
                routeChange();
                Swal.fire({
                    position: "center",
                    type: "success",
                    title: "Your user has been Saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else if (result.dismiss) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    useEffect(() => {
        setUser(location.updateUser);
        updateRef.current.focus();
    }, [location.updateUser.id]);

    return (
        <>
            <div className="col-sm-5">
                <div className='card mb-3 border border-dark rounded-bottom' style={{ borderRadius: '32px', backgroundColor: '#e8eaec' }}>
                    <div className='d-flex justify-content-center'>
                        <h3> Update User {user.id} </h3>
                    </div>
                </div>
                <div className='row'>
                    <Form onSubmit={handleSubmit}>
                        <div className='card border border-dark'>
                            <Form.Group className="mb-3" controlId="Form.ControlInputName">
                                <Form.Label> Name </Form.Label>
                                <Form.Control
                                    required
                                    ref={updateRef}
                                    type="text"
                                    value={user.name}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Form.ControlInputEmail">
                                <Form.Label> Email </Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Form.ControlInputStreet">
                                <Form.Label> Street </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={user.address.street}
                                    onChange={(e) => setUser({ ...user, address: { ...user.address, street: e.target.value } })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Form.ControlInputCity">
                                <Form.Label> City </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={user.address.city}
                                    onChange={(e) => setUser({ ...user, address: { ...user.address, city: e.target.value } })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Form.ControlInputZipCode">
                                <Form.Label> Zip Code </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={user.address.zipcode}
                                    onChange={(e) => setUser({ ...user, address: { ...user.address, zipcode: e.target.value } })}
                                />
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