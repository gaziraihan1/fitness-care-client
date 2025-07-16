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
import { FaCloudUploadAlt } from "react-icons/fa";
const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  const [updating, setUpdating] = useState(false);
  const photoURL = watch("photoURL");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    formData.append("cloud_name", cloud_name);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setValue("photoURL", data.secure_url);
      Swal.fire("Uploaded", "Image uploaded successfully", "success");
    } catch (err) {
      console.error("Cloudinary upload error", err);
      Swal.fire("Upload Failed", "Could not upload image", "error");
    }
  };

  const onSubmit = async (data) => {
    setUpdating(true);
    try {
      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photoURL,
      });

      Swal.fire("Success", "Profile updated successfully", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to update profile", "error", err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar src={photoURL} sx={{ width: 100, height: 100, mb: 2 }} />
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

          <input type="hidden" {...register("photoURL")} />

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            border="2px solid gray"
            p={2}
            my={2}
            borderRadius="8px"
            sx={{ cursor: "pointer" }}
          >
            <label htmlFor="upload-photo" style={{ cursor: "pointer" }}>
              <FaCloudUploadAlt size={30} color="#1976d2" />
              <Typography variant="body2" color="primary">
                &nbsp; Click to Upload Profile Picture
              </Typography>
            </label>
            <input
              type="file"
              id="upload-photo"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
          </Box>

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
