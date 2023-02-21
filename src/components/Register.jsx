import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [Registered, setRegistered] = useState('')
  const [formError, setFormError] = useState(' ');
   function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formData['email'] || !formData['password']) {
        setFormError("Please fill in both email and password fields.");
      } else {
        setFormError("");
    fetch('https://staging.backend.mintapp.cl/api/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.message)
      if (data.message === "User already exists") {
        setRegistered('already_exists');
      } else if (data.message === "User successfully created !") {
        setRegistered('success');
      }
    })
    .catch((error) =>setRegistered('failure'));
};
  }

  const inputFields = [
    { name: 'email', type: 'email', placeholder: 'Enter email' },
    { name: 'password', type: 'password', placeholder: 'Enter password' }
  ];

  return (
    <div className="d-flex justify-content-center align-items-center  vh-100 ">
    <div className='m-5 p-5' style={{width: '23%',}}>
      <Form onSubmit={handleSubmit} >
      
    {Registered === 'success' && <p className="text-success text-center">You are registered successfully!</p>}
    {Registered === 'already_exists' && <p className="text-warning text-center">User with this email already exists!</p>}
    {Registered === 'failure' && <p className="text-danger text-center">Registration failed</p>}
    {formError && <p className="text-warning">{formError}</p>}
        
        <h1 className="text-center">Register</h1>
        {inputFields.map(inputField => (
          <Form.Group key={inputField.name}>
            <Form.Control
              type={inputField.type}
              name={inputField.name}
              value={formData[inputField.name]}
              onChange={handleInputChange}
              placeholder={inputField.placeholder}
              className='m-2'
            />
          </Form.Group>
        ))}
        <Button variant="primary mx-auto d-block" type="submit" className='m-2'>
          Submit
        </Button>
        <Link className='text-primary text-center text-decoration-none d-block' to={'/login'}>
          Already have an account , click here!
        </Link>
      </Form>
      </div>
    </div>
  );
}

export default Register;