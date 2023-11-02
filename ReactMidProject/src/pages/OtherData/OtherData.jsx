import './OtherData.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap-v5';
import TodoCardComp from '../../components/TodoCard/TodoCard';
import PostCardComp from '../../components/PostCard/PostCard';

function OtherDataComp() {
    let navigate = useNavigate();

    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    return (
        <>
            <div className="col-sm-5">
                <h3> Other Data Page </h3>
                <div className="row">
                    <TodoCardComp />
                </div>
                <div className="row mt-5">
                    <PostCardComp />
                </div>

                <Button variant="outline-danger" onClick={routeChange}> Back </Button>
                <br />
            </div>

        </>
    )
}

export default OtherDataComp