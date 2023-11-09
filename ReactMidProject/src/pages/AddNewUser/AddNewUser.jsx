import { useState, useRef } from 'react';
import './AddNewUser.css';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap-v5';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

function AddNewUserComp({ callbackNewUser }) {
    const [user, setUser] = useState({ id: '', name: '', email: '', address: { street: '', city: '', zipcode: '' } });

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        Swal.fire({
            position: "top-end",
            type: "success",
            title: "Your user has been added",
            showConfirmButton: false,
            timer: 1500
        });
        
        callbackNewUser(user);
        routeChange();
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
                        <h3 className='text-center'> Add New User </h3>
                    </div>
                </div>

                <div className="card border border-dark mb-3">
                    <Form onSubmit={handleSubmit} >
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                            <Form.Label column sm="3">
                                Name:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control required onChange={(e) => setUser({ ...user, name: e.target.value })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">
                                Email:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control required onChange={(e) => setUser({ ...user, email: e.target.value })} />
                            </Col>
                        </Form.Group>
                        <div className='d-flex justify-content-end gap-2'>
                            <Button
                                type="submit"
                                variant="primary"
                            > Add
                            </Button>
                        </div>
                    </Form >
                </div>
                <Button variant="outline-danger" onClick={routeChange}> Back </Button>
            </div>

        </>
    )
}

export default AddNewUserComp