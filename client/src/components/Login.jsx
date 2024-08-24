import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import Button from './Button';
import { userLogin } from '../api';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/reducers/userSlice';


const Container = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 36px;
`;

const Title = styled.div`
font-size: 30px;
font-weight: 800;
color: ${({ theme }) => theme.text_primary};
`;

const Span = styled.span``;

const Login = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateInputs = () => {
        if (!email || !password) {
            alert("Please fill in all the fields!");
            return false;
        }
        return true;
    }

    const handleLogin = async() => {
        setLoading(true);
        setButtonDisabled(true);
        if (validateInputs()) {
            await userLogin({email, password}).then((res) => {
                dispatch(loginSuccess(res.data));
                alert("Login successful");
                setLoading(false);
                setButtonDisabled(false);
            }).catch((err) => {
                alert(err.response.data.message);
                setLoading(false);
                setButtonDisabled(false);
            })
        }
    }

  return (
    <Container>
        <div>
            <Title>Welcome to AfyaFit!👋</Title>
            <Span>Please enter your login details here</Span>
        </div>
        <div style={{
            display: "flex",
            gap: "20px",
            flexDirection: "column",
        }}
        >
            <TextInput 
             label="Email Address" 
             placeholder="Enter your email address"
             value={email}
             handelChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
             label="Password" 
             placeholder="Enter your password" 
             password
             value={password}
             handelChange={(e) => setPassword(e.target.value)}

            />
            <Button
             text="Login"
             onClick={handleLogin}
             isLoading={loading}
             isDisabled={buttonDisabled}       
            />
        </div>
    </Container>
  )
}

export default Login;
