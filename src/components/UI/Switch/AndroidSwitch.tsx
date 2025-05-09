"use client";

import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const AndroidSwitch = styled(Switch)(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  display: "flex",
  alignItems: "center",
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "var(--switch-track)",
        opacity: 1,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 16,
    height: 16,
    backgroundColor: "var(--switch-thumb)",
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 20%)",
  },
  "& .MuiSwitch-track": {
    borderRadius: 10,
    backgroundColor: "var(--switch-track)",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default AndroidSwitch;
