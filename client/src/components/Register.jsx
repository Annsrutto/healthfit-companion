import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';
import Button from './Button';
import { userRegister } from '../api';
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

const Register = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateInputs = () => {
        if (!email || !password) {
            alert("Please fill in all the fields!");
            return false;
        }
        return true;
    }

    const handleRegister = async() => {
        setLoading(true);
        setButtonDisabled(true);
        if (validateInputs()) {
            await userRegister({username, email, password}).then((res) => {
                dispatch(loginSuccess(res.data));
                alert("Account created successfully");
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
            <Title>Create New Account</Title>
            <Span>Please enter details to create a new account</Span>
        </div>
        <div style={{
            display: "flex",
            gap: "20px",
            flexDirection: "column",
        }}
        >
            <TextInput
             label="User Name"
             placeholder="Enter your user name"
             value={username}
             handelChange={(e) => setUserName(e.target.value)}
            />
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
             text="Register"
             onClick={handleRegister}
             isLoading={loading}
             isDisabled={buttonDisabled}       
            />
        </div>
    </Container>
  )
}

export default Register;
