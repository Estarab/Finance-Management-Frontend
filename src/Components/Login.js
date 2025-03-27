import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Updated import
import styled from 'styled-components'; // Import styled-components

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // Updated to use useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const response = await fetch('http://localhost:5000/api/v1/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000' || 'https://finance-management-backend-ksxy.onrender.com'}/api/v1/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store JWT token in localStorage
        alert('Login successful! Redirecting to dashboard...');
        navigate('/dashboard-2'); // Updated to use navigate instead of history.push
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error during login');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login');
    }
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <InputField>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputField>
          <InputField>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </InputField>
          <SubmitButton type="submit">Login</SubmitButton>
        </Form>
      </LoginCard>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #80327d, #dab25d);
  padding: 0 15px;
`;

const LoginCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  animation: fadeIn 1s ease-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #80327d;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: #80327d;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #dab25d;
  border-radius: 5px;
  outline: none;
  transition: 0.3s ease-in-out;
  
  &:focus {
    border-color: #80327d;
    box-shadow: 0 0 5px rgba(128, 50, 125, 0.7);
  }
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: #80327d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  
  &:hover {
    background-color: #dab25d;
  }

  &:active {
    background-color: #80327d;
    transform: scale(0.98);
  }
`;

export default Login;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';  // Updated import

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const navigate = useNavigate(); // Updated to use useNavigate

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:5000/api/v1/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem('token', data.token); // Store JWT token in localStorage
//         alert('Login successful! Redirecting to dashboard...');
//         navigate('/dashboard-2'); // Updated to use navigate instead of history.push
//       } else {
//         const errorData = await response.json();
//         alert(errorData.message || 'Error during login');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       alert('An error occurred during login');
//     }
//   };

//   return (
//     <div className="login-form">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Password:
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
