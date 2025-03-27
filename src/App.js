









import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import Dashboard2 from './Components/Dashboard/Dashboard2';
import ReportForm from './Components/Report/ReportForm';
import POS from './Components/POS/POS';

// Import new components for Sign Up and Login
import SignUp from './Components/SignUp';
import Login from './Components/Login';

function App() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <POS />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      case 5:
        return <Dashboard2 />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <Router>
      <AppStyled bg={bg} className="App">
        {orbMemo}
        <MainLayout>
          <main>
            <Routes>
              {/* Root route now renders SignUp only */}
              {/* <Route path="/" element={<SignUp />} /> */}
              <Route path="/" element={<Login />} />
              {/* Other routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard-2" element={<Dashboard2 />} />
              
            </Routes>

            {/* Existing Navigation and displayData logic */}
            {/* <Navigation active={active} setActive={setActive} />
            {displayData()} */}
          </main>
          
        </MainLayout>
        
      </AppStyled>
      
    </Router>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;



