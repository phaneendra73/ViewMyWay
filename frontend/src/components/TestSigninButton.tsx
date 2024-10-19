
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { BACKEND_URL } from "../config";

const TestSignInButton = () => {
    const navigate = useNavigate();

    const handleTestSignIn = async () => {
        const testUser = {
            email: "testing@gmail.com",
            password: "Password", // Use your desired test password
        };

        try {
            const response = await axios.post(`${BACKEND_URL}/user/signin`, testUser);
            console.log(response)
            localStorage.setItem("ViewMyWay", response.data.jwt);

            // Navigate to the desired page after successful login
            navigate("/Posts"); // Change this to your desired route
        } catch (err) {
            console.error(err);
            alert("Failed to sign in with test credentials."); // You can customize this error handling
        }
    };

    return (
        <Button onClick={handleTestSignIn} className="ml-4">
            Login as Guest
        </Button>
    );
};

export default TestSignInButton;
