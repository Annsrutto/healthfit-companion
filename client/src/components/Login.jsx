import styled from 'styled-components';
import TextInput from './TextInput';
import Button from './Button';

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
            <TextInput label="Email Address" placeholder="Enter your email address"/>
            <TextInput label="Password" placeholder="Enter your password"/>
            <Button text="Login" />
        </div>
    </Container>
  )
}

export default Login;
