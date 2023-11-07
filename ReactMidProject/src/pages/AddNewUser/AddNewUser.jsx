import './AddNewUser.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap-v5';

function AddNewUserComp() {
    let navigate = useNavigate();

    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    return (
        <>
            <div className="col-sm-5">
                <h3> Add New User Page </h3>
                <Button variant="outline-danger" onClick={routeChange}> Back </Button>
            </div>

        </>
    )
}

export default AddNewUserComp