import React from "react";
import RemoteTodoApp from "./components/RemoteTodoApp";
import TodoCounter from "./components/TodoCounter";
import { Box } from "@mui/material";

export default function App() {
  return (
    <Box>
      <TodoCounter />
      <RemoteTodoApp />
    </Box>
  );
}
