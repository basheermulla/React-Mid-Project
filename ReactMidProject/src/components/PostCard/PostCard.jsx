
import { useEffect, useState } from 'react';
import { Form, Button, Row } from 'react-bootstrap-v5'
import './PostCard.css'
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

function PostCardComp() {
    const [flag, setFlag] = useState(false);
    const location = useLocation();

    const navigate = useNavigate();
    console.log('Post Card Page');
    const routeChange = () => {
        setFlag(true);
        let path = `/otherData/addPost`;
        navigate(path);
    }

    useEffect(() => {
        if (location.state) {
            setFlag(false);
        }
    })

    return (
        <>
            {!flag
                ?
                <div>
                    <h3> Post Card </h3>
                    <Button variant="info" onClick={routeChange}> Add Post </Button>
                    <h5>Title post [String]</h5>
                    <h5> Body [String]</h5>
                </div>
                :
                <Outlet />
            }

        </>
    )
}

export default PostCardComp