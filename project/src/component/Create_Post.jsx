import React, { useState, useEffect } from 'react';
import Nav_Bar from './Nav_Bar';
import { storageRef } from '../firebase';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { Container } from 'react-bootstrap';

function Create_Post() {
  const [imageUpload, setImageUpload] = useState();
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storageRef, 'uploads/');

  const uploadFile = async (event) => {
    event.preventDefault();
    if (!imageUpload) return;

    try {
      const imageRef = ref(storageRef, `profile/${imageUpload.name}`);
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      setImageList((prev) => [...prev, url]); // Add the new URL to the list
      console.log('Image URL:', url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  useEffect(() => {
    listAll(imageListRef)
      .then((response) => {
        const urlPromises = response.items.map((item) => getDownloadURL(item));
        return Promise.all(urlPromises);
      })
      .then((urls) => {
        setImageList(urls);
      })
      .catch((error) => {
        console.error('Error listing images:', error);
      });
  }, []);

  return (
    <>
      <Nav_Bar />
      <Container>
        <form onSubmit={uploadFile}>
          <input type="file" onChange={(event) => setImageUpload(event.target.files[0])} />
          <button type="submit">Share</button>
        </form>

        <div>
          {imageList.map((url, index) => (
            <img key={index} src={url} alt={`Image ${index}`} style={{ maxWidth: '300px', margin: '10px' }} />
          ))}
        </div>
      </Container>
    </>
  );
}

export default Create_Post;
