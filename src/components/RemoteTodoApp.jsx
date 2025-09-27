import React from 'react';
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorBoundary from "../../../mfe-exp-shell-app/src/components/ErrorBoundary";
import ThrowError from "../../../mfe-exp-shell-app/src/components/ThrowError";
import { useRemoteComponent } from "../hooks/useRemoteComponent";
import Typography from '@mui/material/Typography';

export default function RemoteTodoApp() {
  const {
    Component: TodoList,
    loading,
    error,
  } = useRemoteComponent("todoApp", "TodoList");

  return (
    <Box sx={{ flex: 1, p: 2 }}>
      <ErrorBoundary>
        {loading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Loading Todo App</Typography>
          </Box>
        )}

        {!loading && error && <ThrowError error={error} />}

        {!loading && !error && TodoList && <TodoList />}
      </ErrorBoundary>
    </Box>
  );
}
