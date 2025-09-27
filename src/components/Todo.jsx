import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/todosContext";

export default function Todo({ todo }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.description,
  });

  const { todos, setTodos } = useContext(TodosContext);

  // Event Handlers
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handleDeleteClick() {
    setShowDeleteModal(true);
  }
  function handleUpdateClick() {
    setShowUpdateModal(true);
  }
  function handleDeleteClose() {
    setShowDeleteModal(false);
  }
  function handleUpdateClose() {
    setShowUpdateModal(false);
  }
  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowDeleteModal(false);
  }
  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          title: updatedTodo.title,
          description: updatedTodo.details,
        };
      }
      return t;
    });
    setTodos(updatedTodos);
    setShowUpdateModal(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  // End Event Handlers
  return (
    <>
      {/* Delete modal */}
      <Dialog
        onClose={handleDeleteClose}
        open={showDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">
          {"هل أنت متأكد من حذف هذه المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لن تتمكن من التراجع عن هذا الإجراء
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} autoFocus>
            إغلاق
          </Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* end Delete modal */}
      {/* Update modal */}
      <Dialog
        onClose={handleUpdateClose}
        open={showUpdateModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">{"تعديل المهمة"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, title: e.target.value })
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="تفاصيل المهمة"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose} autoFocus>
            إغلاق
          </Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* end Update modal */}

      <Card
        className="card"
        sx={{
          minWidth: 275,
          background: "#283593",
          textAlign: "center",
          color: "#fff",
          marginTop: "20px",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.description}
              </Typography>
            </Grid>
            <Grid
              sx={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              gap={0.7}
            >
              {/* chech icon button */}
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid 3px #8bc34a",
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* update icon button */}
              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid 3px #1769aa",
                }}
              >
                <ModeEditOutlinedIcon />
              </IconButton>
              {/* delete icon button */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#f44336",
                  background: "white",
                  border: "solid 3px #f44336",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
