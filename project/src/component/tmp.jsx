import React, { useState, useEffect } from 'react';
import Nav_Bar from './Nav_Bar';
import { Container, Button, Form, Modal, Image, Row, Col } from 'react-bootstrap';
import { db } from '../firebase';
import { query, collection, where, getDocs, updateDoc } from "firebase/firestore";
import { useUserAuth } from '../context/UserAuthContext';
import './style/Edit_Profile.css'
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storageRef } from '../firebase';

function Edit_Profile() {
    const [userData, setUserData] = useState(null);
    const [accountData, setAccountData] = useState(null);
    const [editedUsername, setEditedUsername] = useState('');
    const [editedBio, setEditedBio] = useState('');
    const { user } = useUserAuth();

    const [imageUpload, setImageUpload] = useState();
    const [imageList, setImageList] = useState([]);

    const fetchUserData = async () => {
        try {
            const querySnapshot = await getDocs(
                query(collection(db, 'User'), where('email', '==', user.email))
            );
            const newData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setUserData(newData[0]); // Assuming there's only one user per email
            setEditedUsername(newData[0].username);
        } catch (error) {
            console.error('Error fetching user data: ', error);
        }
    };

    const fetchAccountData = async () => {
        try {
            const querySnapshot = await getDocs(
                query(collection(db, 'Account'), where('email', '==', user.email))
            );
            const newData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setAccountData(newData[0]); // Assuming there's only one account per email
            setEditedBio(newData[0].bio);
        } catch (error) {
            console.error('Error fetching account data: ', error);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchAccountData();
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const querySnapshot = await getDocs(
                query(collection(db, "User"), where("email", "==", user.email))
            );

            if (querySnapshot.size === 0) {
                console.log("No matching documents found.");
                return;
            }

            const [usernameDoc] = querySnapshot.docs;
            const taskDocRefUsername = usernameDoc.ref;

            await updateDoc(taskDocRefUsername, { username: editedUsername });
        } catch (err) {
            alert(err);
        }

        try {
            const querySnapshot = await getDocs(
                query(collection(db, "Account"), where("email", "==", user.email))
            );

            if (querySnapshot.size === 0) {
                console.log("No matching documents found.");
                return;
            }

            const [bioDoc] = querySnapshot.docs;
            const taskDocRefBio = bioDoc.ref;

            await updateDoc(taskDocRefBio, { bio: editedBio });
            alert("Complete");
        } catch (err) {
            alert(err);
        }

        fetchUserData();
        fetchAccountData();
    }

    const uploadFile = async (event) => {
        event.preventDefault();
        if (!imageUpload) return;

        try {
            const imageRef = ref(storageRef, `uploads/${imageUpload.name}`);
            const snapshot = await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(snapshot.ref);
            setImageList((prev) => [...prev, url]); // Add the new URL to the list
            console.log('Image URL:', url);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <>
            <Nav_Bar />
            <Container>
                <div
                    className="modal show"
                    style={{ display: 'block', position: 'initial' }}
                >

                    <Modal.Dialog>
                        <Form onSubmit={uploadFile} >
                            <Modal.Header>
                                <Row>
                                    <Col><Image className='profile_img' src="../../img/img.png" roundedCircle /></Col>
                                    <Col>
                                        <div>
                                            {user.email}
                                        </div>
                                        <div className='change_pf_img_btn' >

                                            <Form.Group>
                                                <Form.Control
                                                    type='file'
                                                    onChange={(event) => setImageUpload(event.target.files[0])}
                                                />
                                            </Form.Group>
                                            <Button type='submit' >Change your img file</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Modal.Header>
                        </Form>
                        <Form onSubmit={handleUpdate}>
                            <Modal.Body>
                                <Form.Group as={Row} className="mb-3" controlId="formUsername">
                                    <Form.Label column sm={2}>
                                        Username
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type="text"
                                            value={editedUsername}
                                            onChange={(e) => setEditedUsername(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formBio">
                                    <Form.Label column sm={2}>
                                        Bio
                                    </Form.Label>
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
            </Container >
        </>
    );
}

export default Edit_Profile;