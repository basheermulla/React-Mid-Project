import { useEffect, useState } from 'react';
import './DisplayPosts.css';
import { useLocation } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap-v5';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

function DisplayPostsComp({ callbackSetShowPosts, showPosts, callbackInsertNewPost }) {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [maxPostId, setMaxPostId] = useState('');
    const [newBody, setNewBody] = useState('');

    const { state } = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        const post = {
            userId: user.id,
            title: newTitle,
            body: newBody
        }

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your post has been added",
            showConfirmButton: false,
            timer: 1500
        }).then((result) => {
            if (result.dismiss) {
                setNewTitle('');
                setNewBody('');
                e.target.reset();
                callbackInsertNewPost(post);
                callbackSetShowPosts();
                addNewPost(post);
            }
        });


    }

    // <-------------- Add New Post -------------->
    const addNewPost = (newPost) => {
        let newId = 1;
        if (posts[posts.length - 1]) {
            newId = maxPostId + 1;
        }
        const newPost_Obj = { ...newPost, id: newId };
        // Update state
        state.maxPostId = maxPostId + 1;
        state.postsUser = [...posts, newPost_Obj];
    }

    useEffect(() => {
        setUser(state?.selectedUser);
        setPosts(state?.postsUser);
        setMaxPostId(state?.maxPostId)
    }, [state?.postsUser]);

    return (
        <>
            <div className="card border border-dark" hidden={!showPosts}>
                {
                    posts && posts.map((post) => {
                        return <div className="card mb-4" key={post?.id}>
                            <div className='row'>
                                <label className='col-sm-3'> Title: </label>
                                <div className="col-sm-9">
                                    <label> {post.title || ''} </label>
                                </div>
                            </div>
                            <div className='row'>
                                <label className='col-sm-3 col-form-label'> Body: </label>
                                <div className="col-sm-9">
                                    <label className='col-form-label'> {post.body} </label>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>

            <div className="card border border-dark" hidden={showPosts}>
                <Form onSubmit={handleSubmit} >
                    <Form.Group as={Row} className="mb-3" controlId="Form.ControlInputTitle">
                        <Form.Label column sm="3">
                            Title:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                required
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="Form.ControlInputBody">
                        <Form.Label column sm="3">
                            Body:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                required
                                type="text"
                                value={newBody}
                                onChange={(e) => setNewBody(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            variant="outline-danger"
                            onClick={(e) => {
                                callbackSetShowPosts();
                                setNewTitle('');
                                setNewBody('');
                            }}
                        > Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                        > Add
                        </Button>
                    </div>
                </Form >
            </div>
        </>
    )
}

export default DisplayPostsComp