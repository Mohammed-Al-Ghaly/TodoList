import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function MySnackBar({ open, message }) {
  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit">
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Stack sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          message="Note archived"
          action={action}
        >
          <Alert variant="filled" severity="success">
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
