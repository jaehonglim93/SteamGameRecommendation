import { useAuth } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../services/user";

const DeleteButton = () => {
  const { user, logoutProvider } = useAuth();
  // console.log(user);
  const navigate = useNavigate();
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteUser(user.UserId);
      logoutProvider();
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return <button onClick={handleDelete}>Delete Account</button>;
};

export default DeleteButton;
