
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap-v5';
import './UserCard.css'

function UserCardComp({ userData, callbackNavigate, isUnCompleted }) {
    const [user, setUser] = useState({});
    const [showOtherData, setShowOtherData] = useState(false);
    const [isCompleted, setIsCompleted] = useState(isUnCompleted);

    useEffect(() => {
        setUser(userData);
    }, [])

    return (
        <>
            <div className='card' style={!isCompleted ? { borderColor: 'red' } : { borderColor: 'green' }}>
                <div className='row'>
                    <div className='col-sm-2'>
                        <label className='displayInLine_label'> ID: {user.id} </label>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-2'>
                        <label className='displayInLine_label'> Name: </label>
                    </div>
                    <div className='col-sm-6'>
                        <input className="form-control-static" type="text" value={user.name} readOnly />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-2'>
                        <label className='displayInLine_label'> Email: </label>
                    </div>
                    <div className='col-sm-6'>
                        <input className="form-control-static" type="text" value={user.email} readOnly />
                    </div>
                </div>
                <div className='row flex-row-reverse'>
                    <div className='col-sm-2' hidden={showOtherData}>
                        <Button variant="danger" onClick={(e) => callbackNavigate(e)}> Delete </Button>
                    </div>
                    <div className='col-sm-2' hidden={showOtherData}>
                        <Button variant="info" onClick={(e) => callbackNavigate(e)}> Update </Button>
                    </div>
                    <div className={showOtherData ? 'col-sm-12' : 'col-sm-8'}>
                        <Button variant="dark" onMouseOver={(e) => setShowOtherData(true)}> Other Data </Button>
                    </div>
                </div>
                <br hidden={!showOtherData}/>
                <div className='otherData_div' hidden={!showOtherData} onClick={() => setShowOtherData(false)}>
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
                <br hidden={!showOtherData}/>
                <div className='row flex-row-reverse'>
                    <div className='col-sm-2' hidden={!showOtherData}>
                        <Button variant="danger" onClick={(e) => callbackNavigate(e)}> Delete </Button>
                    </div>
                    <div className='col-sm-2' hidden={!showOtherData}>
                        <Button variant="info" onClick={(e) => callbackNavigate(e)}> Update </Button>
                    </div>
                </div>
            </div >
            <br />
        </>
    )
}

export default UserCardComp