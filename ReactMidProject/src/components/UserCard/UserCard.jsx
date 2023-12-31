import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap-v5';
import './UserCard.css'
import Swal from 'sweetalert2'

function UserCardComp({ userData, callbackNavigate, isUnCompleted, userIdColoredOrange }) {
    const [user, setUser] = useState({});
    const [showOtherData, setShowOtherData] = useState(false);
    const [isCompleted, setIsCompleted] = useState(isUnCompleted);

    const handleNavigate = (event) => {
        callbackNavigate(event, user);
    }

    const handleDelete = (event) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            console.log(result);
            if (result.value) {
                console.log(event);
                callbackNavigate(event, user)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }

    useEffect(() => {
        setUser(userData);
    }, [userData])
    useEffect(() => {
        setIsCompleted(isUnCompleted);
    }, [isUnCompleted])

    return (
        <>
            <div className='card' style={Object.assign({},
                !isCompleted ? { borderColor: 'red' } : { borderColor: 'green' },
                userIdColoredOrange === user.id ? { backgroundColor: 'burlywood' } : { backgroundColor: 'rgba(50,190,255,0.05)' },
            )}>
                <div className='row'>
                    <div className='col-sm-2'>
                        <label
                            className='displayInLine_label'
                            onClick={(e) => {
                                handleNavigate(e)
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            ID: {user.id}
                        </label>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-2'>
                        <label className='displayInLine_label'> Name: </label>
                    </div>
                    <div className='col-sm-6'>
                        <input className="form-control-static" type="text" value={user.name || ''} readOnly />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-2'>
                        <label className='displayInLine_label'> Email: </label>
                    </div>
                    <div className='col-sm-6'>
                        <input className="form-control-static" type="text" value={user.email || ''} readOnly />
                    </div>
                </div>
                <div className='row d-flex justify-content-end'>
                    <div className={showOtherData ? 'col-sm-12 mb-3' : 'col-sm-8 mb-3'}>
                        <Button variant="dark" onMouseOver={(e) => setShowOtherData(true)}> Other Data </Button>
                    </div>
                    <div className='col-sm-2' hidden={showOtherData}>
                        <Button variant="info" onClick={(e) => handleNavigate(e)}> Update </Button>
                    </div>
                    <div className='col-sm-2' hidden={showOtherData}>
                        <Button variant="danger" onClick={(e) => handleDelete(e)}> Delete </Button>
                    </div>
                </div>
                <div className='otherData_div mb-3' hidden={!showOtherData} onClick={() => setShowOtherData(false)}>
                    <div className='row'>
                        <div className='col-sm-2'>
                            <label className='displayInLine_label'> Street: </label>
                        </div>
                        <div className='col-sm-6'>
                            <input className="form-control-static" type="text" value={user.address?.street ?? ''} readOnly />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-2'>
                            <label className='displayInLine_label'> City: </label>
                        </div>
                        <div className='col-sm-6'>
                            <input className="form-control-static" type="text" value={user.address?.city ?? ''} readOnly />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-2'>
                            <label className='displayInLine_last_label'> Zip Code: </label>
                        </div>
                        <div className='col-sm-6'>
                            <input className="form-control-static" type="text" value={user.address?.zipcode ?? ''} readOnly />
                        </div>
                    </div>
                </div >
                <div className='row d-flex justify-content-end'>
                    <div className='col-sm-2' hidden={!showOtherData}>
                        <Button variant="info" onClick={(e) => handleNavigate(e)}> Update </Button>
                    </div>
                    <div className='col-sm-2' hidden={!showOtherData}>
                        <Button variant="danger" onClick={(e) => handleDelete(e)}> Delete </Button>
                    </div>
                </div>
            </div >
            <br />
        </>
    )
}

export default UserCardComp