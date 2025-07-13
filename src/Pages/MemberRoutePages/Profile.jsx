import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  const [updating, setUpdating] = useState(false);

  const onSubmit = async (data) => {
    setUpdating(true);
    try {
      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photoURL,
      });

      Swal.fire("Success", "Profile updated successfully", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to update profile", "error",err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar
            src={user?.photoURL}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography variant="h5" fontWeight="bold">
            Profile Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last login: {user?.metadata?.lastSignInTime}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Full Name"
            fullWidth
            {...register("name", { required: true })}
            margin="normal"
          />
          <TextField
            label="Profile Picture URL"
            fullWidth
            {...register("photoURL")}
            margin="normal"
          />
          <TextField
            label="Email"
            fullWidth
            value={user?.email}
            disabled
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Profile;
