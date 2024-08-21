import styled from 'styled-components';
import logo from '../assets/Images/afyaFitLogo.png';
import fitImage from "../assets/Images/Fitness.jpg";
import { useState } from 'react';
import Register from '../components/Register';
import Login from '../components/Login';

const Container = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    background: ${({ theme }) => theme.bg};
    @media (max-width: 700px) {
        flex-direction: column;
    }
`;
const Left = styled.div`
    flex: 1;
    background: white;
    position: relative;
    @media (max-width: 700px) {
        display: none;
    }
`;

const Logo = styled.img`
    position: absolute;
    width: 100px;
    top: 40px;
    left: 60px;
    z-index: 10
`;

const Image = styled.img`
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Right = styled.div`
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 40px;
    gap: 16px;
    align-items: center;
    justify-content: center;
`;

const Text = styled.div`
    font-size: 16px;
    text-align: center;
    color: ${({ theme }) => theme.text_secondary};
    margin-top: 16px;
    @media (max-width: 400px) {
        font-size: 14px; 
    }
`;

const TextButton = styled.span`
color: ${({ theme }) => theme.primary};
cursor: pointer;
font-weight: 600;
transition: all 0.3s ease;
`;

const Authentication = () => {
    const [login, setLogin] = useState(false);
  return (
    <Container>
      <Left>
        <Logo src={logo} />
        <Image src={fitImage} />
      </Left>
      <Right>
        { !login ? (
          <>
        <Register />
        <Text>Don't have an account?<TextButton onClick={() => setLogin(true)} >Register</TextButton></Text></>
      ):(
      <>
         <Login />
        <Text>Already have an account?<TextButton onClick={() => setLogin(false)} >Login</TextButton></Text></>)}
      </Right>
    </Container>
  )
}

export default Authentication;
