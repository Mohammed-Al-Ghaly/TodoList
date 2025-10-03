import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";
import { useToast } from "../contexts/ToastContext";

export default function Todo({ todo, showDeleteDaialog, showUpdateDialog }) {
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useToast();

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
    showHideToast("تم تغيير حالة المهمة بنجاح");
  }
  function handleDeleteClick() {
    showDeleteDaialog(todo);
  }
  function handleUpdateClick() {
    showUpdateDialog(todo);
  }

  // End Event Handlers
  return (
    <>
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
                <EditIcon />
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
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
