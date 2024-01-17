import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import { useAuth } from "../../helpers/AuthContext";
import { updateUser } from "../../services/user";

const UpdateProfile = () => {
  const { user, loginProvider } = useAuth();
  const [newUsername, setNewUsername] = useState(user.Username);
  const [newEmail, setNewEmail] = useState(user.Email);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        ...user,
        Username: newUsername,
        Email: newEmail,
      };
      await updateUser(user.UserId, newUser);
      loginProvider(newUser);
      navigate("/profile");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <label>
          Update Username:
          <input
            type="text"
            value={newUsername}
            onChange={(event) => setNewUsername(event.target.value)}
          />
        </label>
        <label>
          Update Email:
          <input
            type="text"
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
          />
        </label>
        <Button type="submit">Update Profile</Button>
      </form>
      <Link to="/profile">Back</Link>
    </div>
  );
};

// const UpdateProfile = () => {
//   const { user } = useAuth();
//   const [newUsername, setNewUsername] = useState("");
//   const navigate = useNavigate();

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await updateUser(user.Username, newUsername);
//       navigate("/profile");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleUpdate}>
//         <label>
//           Change Username:
//           <input
//             type="text"
//             value={newUsername}
//             onChange={(event) => setNewUsername(event.target.value)}
//           />
//         </label>
//         <Button type="submit">Update Username</Button>
//       </form>
//       <Link to="/profile">Back</Link>
//     </div>
//   );
// };

export default UpdateProfile;
