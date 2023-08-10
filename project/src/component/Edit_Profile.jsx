import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Form, Modal, Image, Row, Col } from 'react-bootstrap';
import { query, collection, where, getDocs, updateDoc } from 'firebase/firestore';
import { useUserAuth } from '../context/UserAuthContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storageRef, db } from '../firebase';
import Nav_Bar from './Nav_Bar';
import './style/Edit_Profile.css';

function Edit_Profile() {
    const { user } = useUserAuth();
    const [editedUsername, setEditedUsername] = useState('');
    const [editedBio, setEditedBio] = useState('');
    const fileInputRef = useRef(null);

    const fetchUserData = async () => {
        const fetchUserDataQuery = async (collectionName, stateSetter, property) => {
            const querySnapshot = await getDocs(
                query(collection(db, collectionName), where('email', '==', user.email))
            );
            if (!querySnapshot.empty) {
                stateSetter(querySnapshot.docs[0].data()[property]);
            }
        };

        fetchUserDataQuery('User', setEditedUsername, 'username');
        fetchUserDataQuery('Account', setEditedBio, 'bio');
    };

    useEffect(() => {
        fetchUserData();
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updateUserField = async (collectionName, property, value) => {
            const querySnapshot = await getDocs(
                query(collection(db, collectionName), where('email', '==', user.email))
            );

            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, { [property]: value });
            }
        };

        await updateUserField('User', 'username', editedUsername);
        await updateUserField('Account', 'bio', editedBio);

        alert('updated')
        fetchUserData();
    };

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const imageRef = ref(storageRef, `uploads/${selectedFile.name}`);
            await uploadBytes(imageRef, selectedFile);
            const url = await getDownloadURL(imageRef);
            console.log('Image URL:', url);
            alert('updated')
        }
    };

    return (
        <>
            <Nav_Bar />
            <Container>
                <div className="modal show" style={{ display: 'block', position: 'initial' }}>
                    <Modal.Dialog>
                        <Form onSubmit={handleUpdate}>
                            <Modal.Header>
                                <Row>
                                    <Col>
                                        <Image className='profile_img' src="../../img/default_user_icon.png" roundedCircle />
                                    </Col>
                                    <Col>
                                        <div>{user.email}</div>
                                        <div className='change_pf_img_btn' onClick={() => fileInputRef.current.click()}>
                                            Change your profile image
                                        </div>
                                        <input
                                            type='file'
                                            id='fileInput'
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                    </Col>
                                </Row>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group as={Row} className="mb-3" controlId="formUsername">
                                    <Form.Label column sm={2}>Username</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type="text"
                                            value={editedUsername}
                                            onChange={(e) => setEditedUsername(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formBio">
                                    <Form.Label column sm={2}>Bio</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type="text"
                                            value={editedBio}
                                            onChange={(e) => setEditedBio(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" type='submit'>Save changes</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Dialog>
                </div>
            </Container>
        </>
    );
}

export default Edit_Profile;
