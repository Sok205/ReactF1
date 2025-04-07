import { useState} from "react";
import axios from "axios";
import { DriverChangeRequest, DriverChangeResponse } from "../../api/type";
import { useNavigate, Link } from "react-router-dom";
import './styles/Auth.css'

const Profile = () => {
    // Creating a form that will handle our fav_driver change
    const [form, setForm] = useState({ fav_driver: '' });
  
    // Registering the change of the favourite driver
    const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleDriverBackendChange = async () => {
      const params = new URLSearchParams();
      params.append("fav_driver", form.fav_driver);
      const user_id = localStorage.getItem("user_id");
  
      try {
        // Using template literals to embed user_id in the URL
        const response = await axios.post<DriverChangeResponse>(
          `http://127.0.0.1/profile/${user_id}/driver`,
          params,
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
        alert("Driver changed successfully");
      } catch (err: any) {
        alert(err?.response?.data?.detail || "Couldn't get the driver");
      }
    };
  
    return (
      <>
        <div>
          <input
            name="fav_driver"
            type="text"
            onChange={handleDriverChange}
            placeholder="Max Verstappen"
          />
        </div>
        <button onClick={handleDriverBackendChange}>Change Driver</button>
      </>
    );
  };
  
  export default Profile;
  