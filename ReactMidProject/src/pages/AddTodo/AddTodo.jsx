import './AddTodo.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap-v5';

function AddTodoComp() {
    const navigate = useNavigate();
    console.log('Add Todo Page');
    const routeChange = () => {
        let path = `/otherData`;
        navigate(path, { state: { flag: false } });
    }

    return (
        <>
            <div>
                <h3> Add Todo Page </h3>
                {/* <br />
                <button className='btn btn-info' onClick={routeChange}><b> Start </b>  </button> */}
                <Button variant="outline-danger" onClick={routeChange}> Back </Button>
            </div>

        </>
    )
}

export default AddTodoComp