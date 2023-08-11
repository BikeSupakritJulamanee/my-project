import React, { useState, useEffect, useRef } from 'react';
// import { Container, Button, Form, Modal, Image, Row, Col } from 'react-bootstrap';
// import { query, collection, where, getDocs, updateDoc } from 'firebase/firestore';
import { useUserAuth } from '../context/UserAuthContext';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storageRef, db } from '../firebase';
import Nav_Bar from './Nav_Bar';
import './style/Edit_Profile.css';

function Edit_Profile() {
    const { user } = useUserAuth();
    // const [editedUsername, setEditedUsername] = useState('');
    // const [editedBio, setEditedBio] = useState('');
    const fileInputRef = useRef(null);

    const [imageList, setImageList] = useState([]);

    const imageListRef = ref(storageRef, 'profile/');

    // const fetchUserData = async () => {
    //     const fetchData = async (collectionName, stateSetter, property) => {
    //         const querySnapshot = await getDocs(query(collection(db, collectionName), where('email', '==', user.email)));
    //         if (!querySnapshot.empty) stateSetter(querySnapshot.docs[0].data()[property]);
    //     };

    //     fetchData('User', setEditedUsername, 'username');
    //     fetchData('Account', setEditedBio, 'bio');
    // };

    // useEffect(() => {
    //     fetchUserData();
    // }, [user]);

    // const updateUserField = async (collectionName, property, value) => {
    //     const querySnapshot = await getDocs(query(collection(db, collectionName), where('email', '==', user.email)));
    //     if (!querySnapshot.empty) await updateDoc(querySnapshot.docs[0].ref, { [property]: value });
    // };

    // const handleUpdate = async (e) => {
    //     e.preventDefault();
    //     await updateUserField('User', 'username', editedUsername);
    //     await updateUserField('Account', 'bio', editedBio);
    //     alert('Updated');
    //     fetchUserData();
    // };

    // const handleFileChange = async (event) => {
    //     const selectedFile = event.target.files[0];
    //     if (selectedFile) {
    //         const imageRef = ref(storageRef, `profile/${selectedFile.name}`);
    //         try {
    //             await uploadBytes(imageRef, selectedFile);
    //             const url = await getDownloadURL(imageRef);
    //             console.log('Image URL:', url);
    //             await updateUserField('Account', 'image_profile', selectedFile.name);
    //             alert('Profile image updated successfully');
    //         } catch (error) {
    //             console.error('Error uploading image:', error);
    //             alert('An error occurred while updating the profile image: ' + error.message);
    //         }
    //     }

    useEffect(() => {
        listAll(imageListRef)
            .then((response) => {
                const urlPromises = response.items.map((item) => getDownloadURL(item));
                return Promise.all(urlPromises);
            })
            .then((urls) => {
                console.log('Image URLs:', urls);
                setImageList(urls);
            })
            .catch((error) => {
                console.error('Error listing images:', error);
            });
    }, []);

    // Find the URL for the image named 'img.png'
    const imgURL = imageList.find(url => url.includes('img.png'));
    // };

    return (
        <>
            <Nav_Bar />

            {imgURL && (
                <div>
                    <img src={imgURL} alt={`Image`} style={{ maxWidth: '300px', margin: '10px' }} />
                    <p>Image URL: {imgURL}</p>
                </div>
            )}
            {/* <Container>
                <div className="modal show" style={{ display: 'block', position: 'initial' }}>
                    <Modal.Dialog>
                        <Form onSubmit={handleUpdate}>
                            <Modal.Header>
                                <Row>
                                    <Col>
                                        <Image className='profile_img' src="../../img/default_user_profile.png" roundedCircle />
                                    </Col>
                                    <Col>
                                        <div>{user.email}</div>
                                        <div className='change_pf_img_btn' onClick={() => fileInputRef.current.click()}>Change your profile image</div>
                                        <input type='file' id='fileInput' ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                                    </Col>
                                </Row>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group as={Row} className="mb-3" controlId="formUsername">
                                    <Form.Label column sm={2}>Username</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" value={editedUsername} onChange={(e) => setEditedUsername(e.target.value)} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formBio">
                                    <Form.Label column sm={2}>Bio</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" value={editedBio} onChange={(e) => setEditedBio(e.target.value)} />
                                    </Col>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" type='submit'>Save changes</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Dialog>
                </div>
            </Container> */}
        </>
    );
}

export default Edit_Profile;