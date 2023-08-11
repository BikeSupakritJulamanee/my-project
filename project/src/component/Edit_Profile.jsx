import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Form, Modal, Image, Row, Col } from 'react-bootstrap';
import { query, collection, where, getDocs, updateDoc } from 'firebase/firestore';
import { useUserAuth } from '../context/UserAuthContext';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storageRef, db } from '../firebase';
import Nav_Bar from './Nav_Bar';
import './style/Edit_Profile.css';

function Edit_Profile() {
    const { user } = useUserAuth();
    const [userData, setUserData] = useState({});
    const fileInputRef = useRef(null);
    const [imageList, setImageList] = useState([]);
    const imageListRef = ref(storageRef, 'profile/');

    useEffect(() => {
        const fetchData = async (collectionName, property) => {
            const querySnapshot = await getDocs(query(collection(db, collectionName), where('email', '==', user.email)));
            if (!querySnapshot.empty) {
                setUserData(prevData => ({
                    ...prevData,
                    [property]: querySnapshot.docs[0].data()[property]
                }));
            }
        };

        fetchData('User', 'username');
        fetchData('Account', 'bio');
        fetchData('Account', 'profile_image');

        listAll(imageListRef)
            .then(response => Promise.all(response.items.map(item => getDownloadURL(item))))
            .then(urls => setImageList(urls))
            .catch(error => console.error('Error listing images:', error));
    }, [user]);

    const updateUserField = async (collectionName, property, value) => {
        const querySnapshot = await getDocs(query(collection(db, collectionName), where('email', '==', user.email)));
        if (!querySnapshot.empty) {
            await updateDoc(querySnapshot.docs[0].ref, { [property]: value });
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateUserField('User', 'username', userData.username);
        await updateUserField('Account', 'bio', userData.bio);
        alert('Updated');
    };

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const imageRef = ref(storageRef, `profile/${selectedFile.name}`);
            try {
                await uploadBytes(imageRef, selectedFile);
                const url = await getDownloadURL(imageRef);
                console.log('Image URL:', url);
                await updateUserField('Account', 'profile_image', selectedFile.name);
                alert('Profile image updated successfully');
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('An error occurred while updating the profile image: ' + error.message);
            }
        }
    }

    const imgURL = imageList.find(url => url.includes(userData.profile_image));

    return (
        <>
            <Nav_Bar />
            <Container>
                <div className="modal show" style={{ display: 'block', position: 'initial' }}>
                    <Modal.Dialog>
                        <Form onSubmit={handleUpdate}>
                            <Modal.Header>
                                <Col sm='4' >
                                    <Image className='profile_img' src={imgURL} roundedCircle />
                                </Col>
                                <Col sm='8' className='Modal_title' >
                                    <div>{user.email}</div>

                                    <div className='change_pf_img_btn' onClick={() => fileInputRef.current.click()}>Change your profile image</div>
                                    <input type='file' id='fileInput' ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                                </Col>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group as={Row} className="mb-3" controlId="formUsername">
                                    <Form.Label column sm={1}>Username</Form.Label>

                                    <Col sm={11}>

                                        <Form.Control
                                            className="input-small"

                                            type="text"
                                            value={userData.username || ''}
                                            onChange={e => setUserData({ ...userData, username: e.target.value })}
                                        />

                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formBio">
                                    <Form.Label column sm={1}  >Bio</Form.Label>
                                    <Col sm={11} className="input-container">
                                        <Form.Control
                                            className="input-small-resize"
                                            as="textarea" // เปลี่ยนจาก type="text" เป็น as="textarea"
                                            value={userData.bio || ''}
                                            onChange={e => setUserData({ ...userData, bio: e.target.value })}
                                        />
                                    </Col>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="custom-button-style" type='submit'>Save changes</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Dialog>
                </div>
            </Container>
        </>
    );
}

export default Edit_Profile;