import React, { useState} from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const Login = () => {


const navigate = useNavigate();  

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      localStorage.setItem("token", res.data.token);
        
       navigate("/home")
       
    }
    catch (err) {


      console.log(err);

    }
  };
 
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 4,
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight="bold"
          mb={3}
          color="white"
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
            required

          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required

          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 2,
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;