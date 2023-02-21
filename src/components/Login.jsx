import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [login, setlogin] = useState(undefined)
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
    fetch('https://staging.backend.mintapp.cl/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.token)
      if (data.message === "success") {
        cookies.set("TOKEN", data.token, {
            path: "/",
          });
        setlogin(true);
        window.location.href = "/";
      } else if (data.message === "failure") {
        setlogin(false);
      }
    })
    .catch((error) =>setlogin(false));
};
  }

  const inputFields = [
    { name: 'email', type: 'email', placeholder: 'Enter email' },
    { name: 'password', type: 'password', placeholder: 'Enter password' }
  ];

  return (
    <div className="d-flex justify-content-center align-items-center  vh-100">
     <div className='m-5 p-5' style={{width: '23%',}}>
      <Form onSubmit={handleSubmit}>
    {login && <p className="text-success text-center">You are logged in successfully!</p>}
    {login === false && <p className="text-danger text-center">Login failed, please check email or password!</p>}
    {formError && <p className="text-warning">{formError}</p>}
        
        <h1 className="text-center">Login</h1>
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
        <Button variant="primary" type="submit" className='m-2 mx-auto d-block'>
          Submit
        </Button>
        <Link className='text-primary text-center text-decoration-none d-block' to={'/register'}>
          Don't have an account yet, click here!
        </Link>
      </Form>
      </div>
    </div>
  );
}

export default Login;