import { ThemeProvider, styled } from 'styled-components';
import { lightTheme } from './assets/Themes';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authentication from './pages/Authentication';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Exercises from './pages/Exercises';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
  `;

const App = () => {
  const [user, setUser] = useState(true);
  return (
    <ThemeProvider theme={ lightTheme }>
      <BrowserRouter>
      { user ? (
        <Container>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/exercises" exact element={<Exercises />} />
          </Routes>
        </Container>
        ) : (
      <Container>
        <Authentication />
      </Container>
    )}
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;

