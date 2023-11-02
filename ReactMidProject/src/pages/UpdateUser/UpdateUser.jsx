import './UpdateUser.css'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap-v5';

function UpdateUserComp() {
    let navigate = useNavigate();

    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    return (
        <>
            <div className="col-sm-5">
                <h3> Update User Page </h3>
                {/* <br />
                <button className='btn btn-info' onClick={routeChange}><b> Start </b>  </button> */}
                <Button variant="outline-danger" onClick={routeChange}> Back </Button>
            </div>
        </>
    )
}

export default UpdateUserComp