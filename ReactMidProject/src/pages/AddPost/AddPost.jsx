import './AddPost.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap-v5';

function AddPostComp() {
    const navigate = useNavigate();
    console.log('Add Post Page');
    const routeChange = () => {
        let path = `/otherData`;
        navigate(path, { state: { flag: false } });
    }

    return (
        <>
            <div>
                <h3> Add Post Page </h3>
                {/* <br />
                <button className='btn btn-info' onClick={routeChange}><b> Start </b>  </button> */}
                <Button variant="outline-danger" onClick={routeChange}> Back </Button>
                <br /><br />
            </div>

        </>
    )
}

export default AddPostComp