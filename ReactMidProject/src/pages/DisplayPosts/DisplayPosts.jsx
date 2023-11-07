import { useEffect, useState } from 'react';
import './DisplayPosts.css';
import { useLocation } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap-v5';

function DisplayPostsComp({ callbackSetShowPosts, showPosts, callbackInsertNewPost }) {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newBody, setNewBody] = useState('');

    const location = useLocation().state;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        console.log(form.checkValidity());
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        const post = {
            userId: user.id,
            title: newTitle,
            body: newBody
        }

        console.log(post);
        setNewTitle('');
        setNewBody('');
        e.target.reset();

        callbackInsertNewPost(post);
        callbackSetShowPosts();
    }
    useEffect(() => {
        setUser(location.selectedUser);
        setPosts(location.postsUser);
    }, [location.selectedUser.id]);

    useEffect(() => {
        setPosts(location.postsUser);
    }, [location.postsUser]);

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
                <Form onSubmit={handleSubmit} >
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextTitle">
                        <Form.Label column sm="3">
                            Title:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control required defaultValue={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextBody">
                        <Form.Label column sm="3">
                            Body:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control required defaultValue={newBody} onChange={(e) => setNewBody(e.target.value)} />
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