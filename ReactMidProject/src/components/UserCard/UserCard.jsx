
import { useState } from 'react';
import { Form, Button, Row } from 'react-bootstrap'
import './UserCard.css'
import { useNavigate } from 'react-router-dom';

function UserCardComp() {
    // const [fName, setFName] = useState('');
    // const [lName, setLName] = useState('');

    // const navigate = useNavigate();

    // const handleSubmit = async (e) => {

    //     e.preventDefault();

    //     const form = e.currentTarget;
    //     console.log(form.checkValidity());
    //     if (form.checkValidity() === false) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //     }

    //     const obj = { state: { firstName: fName, lastName: lName } }
    //     let path = `cityPath`;

    //     navigate(`/${path}`, obj);
    // }

    return (
        <>
            <div>
                <h3> User Card </h3>
                {/* <Row className="mb-3">
                    <Form onSubmit={handleSubmit}>
                        <div className='card div_hieght'>
                            <Form.Group className="mb-3" onChange={(e) => setFName(e.target.value)} controlId="exampleForm.ControlInput1">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control required type="text" placeholder="First Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" onChange={(e) => setLName(e.target.value)} controlId="exampleForm.ControlInput1">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control required type="text" placeholder="Last Name" />
                            </Form.Group>
                            <br />
                        </div>
                        <br />
                        <Button className='btn btn-secondary' onClick={() => navigate(-1)}><b>{'<- '} Back </b></Button> {' '}
                        <Button type="submit"><b> Next {' ->'}</b> </Button>
                    </Form>
                </Row> */}
            </div>

        </>
    )
}

export default UserCardComp