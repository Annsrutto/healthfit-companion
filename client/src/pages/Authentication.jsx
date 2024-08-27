import styled from 'styled-components';
import logo from '../assets/Images/Logo.png'; // Assuming your logo image is here
import fitImage from "../assets/Images/FitImg.jpg";
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
    background-image: url(${fitImage});
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    align-items: center;  /* Align logo and text vertically */
    @media (max-width: 700px) {
        display: none;
    }
`;

const Logo = styled.img`
    position: absolute;
    width: 70px;
    top: 40px;
    left: 20px;
    height: 100px;
    margin-right: 5px;
    -webkit-mask-image: url(${logo});
    mask-image: url(${logo});
`;

const AfyaFitText = styled.span`
    position: absolute;
    width: 70px;
    top: 40px;
    left: 100px;
    font-size: 40px;
    font-weight: 600;
    color: ${({ theme }) => theme.white};
`;

const Right = styled.div`
    flex: 1;
    background-color: white;  /* Keep the right side white */
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
        <AfyaFitText>AfyaFit</AfyaFitText>
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
