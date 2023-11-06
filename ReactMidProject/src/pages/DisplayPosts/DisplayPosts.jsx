import { useEffect, useState } from 'react';
import './DisplayPosts.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap-v5';

function DisplayPostsComp({ callbackSetShowPosts, showPosts }) {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    const location = useLocation().state;

    const navigate = useNavigate();

    useEffect(() => {
        setUser(location.selectedUser);
        setPosts(location.postsUser);
    }, [location.selectedUser.id])

    return (
        <>
            <div className="card border border-dark" hidden={!showPosts}>
                {
                    posts && posts.map((post) => {
                        return <div className="card mb-4" key={post.id}>
                            <div className='row'>
                                <label className='col-sm-2'> Title: </label>
                                <div className="col-sm-10">
                                    <label> {post.title || ''} </label>
                                </div>
                            </div>
                            <div className='row'>
                                <label className='col-sm-2 col-form-label'> Body: </label>
                                <div className="col-sm-10">
                                    <label className='col-form-label'> {post.body} </label>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>

            <div className="card border border-dark" hidden={showPosts}>
                <div className="card mb-4">
                    <div className='row mb-4'>
                        <label className='col-sm-3'> Title: </label>
                        <div className="col-sm-9">
                            <input className="form-control-static" type="text" value={/*user.name || ''*/'Add Title Post'} readOnly />
                        </div>
                    </div>
                    <div className='row'>
                        <label className='col-sm-3'> Body: </label>
                        <div className="col-sm-9">
                            <input className="form-control-static" type="text" value={/*user.name || ''*/'Add Body Post'} readOnly />
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end gap-2'>
                    <Button
                        className=''
                        variant="outline-danger"
                        onClick={(e) => {
                            callbackSetShowPosts()
                            // routeChange()
                        }}> Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={(e) => {
                            callbackSetShowPosts()
                            // routeChange()
                        }}> Add
                    </Button>
                </div>
            </div>

        </>
    )
}

export default DisplayPostsComp