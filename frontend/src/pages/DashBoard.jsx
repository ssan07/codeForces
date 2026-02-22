import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  return (
    <div>
        <h2>Welcome {user.username}</h2>
        <p>XP: {user.xp}</p>
        <button onClick={logout}>Logout</button>
    </div>  
  );
};

export default Dashboard;