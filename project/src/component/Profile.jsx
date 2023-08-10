import React, { useEffect, useState } from 'react';
import Nav_Bar from './Nav_Bar';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firebase configuration and initialize itW
import { Link } from 'react-router-dom';

function Profile() {
  const { user } = useUserAuth();
  const [userData, setUserData] = useState(null);
  const [accountData, setAccountData] = useState(null);

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
    } catch (error) {
      console.error('Error fetching account data: ', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchAccountData();
  }, [user]);

  return (
    <>
      <Nav_Bar />
      <Container>
        <Row>
          <Col xs={4} className="d-flex justify-content-center align-items-center">
            <Image src="../../img/img.png" roundedCircle style={{ width: '120px' }} />
          </Col>
          <Col xs={8} style={{ textAlign: 'left' }}>
            <Row>
              <div>
                <h4>{userData && userData.username}</h4>
                <Link to={'/edit_profile'} >
                  Edit Profile
                </Link>
              </div>
            </Row>
            <Row>
              <Col>{accountData && `${accountData.posts} posts`}</Col>
              <Col>{accountData && `${accountData.followers} followers`}</Col>
              <Col>{accountData && `${accountData.following} following`}</Col>
            </Row>
            <Row>{accountData && `${accountData.bio}`}</Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
