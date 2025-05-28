"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import styles from "./ConnectView.module.scss";

export default function ConnectPage() {
  const isMobile = useMediaQuery("(max-width:763px)");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/xnndedqa", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok) {
        setSnackbarOpen(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        console.error("Formspree error:", result);
        // Optional: handle failure state
      }
    } catch (err) {
      console.error("Submission failed:", err);
      // Optional: handle network failure
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const sharedTextSx = {
    fontFamily: "var(--font-outfit)",
    fontSize: "16px",
    fontWeight: 500,
    color: "var(--foreground)",
  };

  const sharedFieldSx = {
    ...sharedTextSx,
    input: {
      ...sharedTextSx,
    },
    textarea: {
      ...sharedTextSx,
      height: isMobile ? "80px" : "100px !important",
      resize: "none",
    },
    "& .MuiInput-root:before": {
      borderBottom: "1px solid var(--foreground)",
    },
    "& .MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before": {
      borderBottom: "1px solid var(--accent)",
    },
    "& .MuiInput-root.Mui-focused:after": {
      borderBottom: "2px solid var(--accent)",
    },
    "& label": {
      ...sharedTextSx,
      fontSize: "14px",
    },
    "& label.Mui-focused": {
      color: "var(--accent)",
    },
  };

  return (
    <main className={styles.content}>
      <h3>connect & create</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          variant="standard"
          fullWidth
          required
          margin="normal"
          sx={sharedFieldSx}
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          variant="standard"
          fullWidth
          required
          margin="normal"
          sx={sharedFieldSx}
        />

        <TextField
          label="Message"
          name="message"
          value={form.message}
          onChange={handleChange}
          variant="standard"
          fullWidth
          required
          multiline
          rows={isMobile ? 2 : 5}
          margin="normal"
          sx={sharedFieldSx}
        />

        <Button
          variant="outlined"
          type="submit"
          sx={{
            mt: 2,
            alignSelf: "flex-start",
            color: "var(--accent)",
            borderColor: "var(--accent)",
            fontWeight: 600,
            padding: "0.6rem 1.5rem",
            borderRadius: "4px",
            textTransform: "none",
            width: "100%",
            fontSize: "16px",
          }}
        >
          Send Message
        </Button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            backgroundColor: "var(--snackbar-bg)",
            color: "var(--snackbar-text)",
            border: "1px solid var(--accent)",
            fontFamily: "var(--font-outfit)",
            fontSize: "16px",
            fontWeight: 500,
            textAlign: "center",
            padding: "0.75rem 1.25rem",
            borderRadius: "6px",
            "& .MuiAlert-icon": {
              padding: "8px 0",
              color: "var(--accent)",
            },
          }}
        >
          Message sent successfully!
        </Alert>
      </Snackbar>
    </main>
  );
}
