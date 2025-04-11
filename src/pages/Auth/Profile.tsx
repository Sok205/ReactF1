import { useState, useEffect } from "react";
import axios from "axios";
import { DriverChangeResponse } from "../../api/type";
import { data, Link } from "react-router-dom";
import './styles/Auth.css';

interface Profile {
  id?: number;
  username: string;
  fav_driver: string;
  send_notification: boolean;
  email: string;
  user_id: number;
}

const ProfileComponent: React.FC = () => {

  const [profile, setProfile] = useState<Profile | null>(null);

  const [form, setForm] = useState({ fav_driver: '' });
  const [loading, setLoading] = useState<boolean>(true);


  const fetchProfile = async () => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      alert("User id not found");
      return;
    }
    try {
      const response = await axios.get<Profile>(`http://127.0.0.1:8000/profile/${user_id}`);
      setProfile(response.data);
      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching profile:", err);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProfile();
  }, []);

  const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDriverBackendChange = async () => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      alert("User id not found");
      return;
    }

    const data = {"fav_driver": form.fav_driver}

    try {
      console.log(data)
      const response = await axios.put<DriverChangeResponse>(
        `http://127.0.0.1:8000/profile/${user_id}/driver`,
        data,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      alert("Driver changed successfully");
      fetchProfile();
    } catch (err: any) {
      alert(err?.response?.data?.detail || "Couldn't change the driver");
    }
  };


  // Handler to update the status of the notifications
  const HandlerNotificationChange = async () => {
     
    const user_id = localStorage.getItem("user_id");
    if (!user_id){
        alert("User id not found")
        return;
    }

    const notifaction = !profile?.send_notification

   const data = {'notification':notifaction}

    try{
        const respomse = await axios.put(
            `http://127.0.0.1:8000/profile/${user_id}/notification`,
            data,
            {
                headers: {"Content-Type": "application/json"}
            }
        );
        alert("Status changed successfully");
        fetchProfile();
    }catch(err: any){
        alert(err?.response?.data?.detail || "Couldn't change the notifcation status");
    }

  }

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div className="profile-container">
      <h1>{profile.username}'s Profile</h1>
      <p>Email: {profile.email} </p>
      <p>Favourite Driver: {profile.fav_driver}</p>
      <p>Send Notification: {profile.send_notification ? "Yes" : "No"}</p>
      <button onClick={() => HandlerNotificationChange()}>Change Status</button>
      <hr />
      <h2>Change Favourite Driver</h2>
      <div>
        <input
          name="fav_driver"
          type="text"
          onChange={handleDriverChange}
          placeholder="Enter new favourite driver"
        />
        <button onClick={handleDriverBackendChange}>Change Driver</button>
      </div>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default ProfileComponent;
