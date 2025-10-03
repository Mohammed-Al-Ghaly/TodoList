import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

//
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";

import { TodosContext } from "../contexts/todosContext";
import { useToast } from "../contexts/ToastContext";

import { useState, useContext, useEffect, useMemo } from "react";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useToast();

  const [dialogTodo, setDialogTodo] = useState(null);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Filteration Arrays
  const completedTodos = useMemo(() => {
    return todos.filter((t) => t.isCompleted);
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => !t.isCompleted);
  }, [todos]);

  let todosToBeRendered = todos;
  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      description: "لا توجد تفاصيل",
      isCompleted: false, // Fix: Corrected typo from 'isComleted' to 'isCompleted'
    };
    setTodos([newTodo, ...todos]);
    localStorage.setItem("todos", JSON.stringify([newTodo, ...todos]));
    setTitleInput("");
    showHideToast("تم إضافة المهمة بنجاح");
  }

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }
  function handleDeleteClose() {
    setShowDeleteModal(false);
  }

  function showUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateModal(true);
  }

  function handleUpdateClose() {
    setShowUpdateModal(false);
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === dialogTodo.id) {
        return {
          ...t,
          title: dialogTodo.title,
          description: dialogTodo.details,
        };
      }
      return t;
    });
    setTodos(updatedTodos);
    setShowUpdateModal(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast("تم تعديل المهمة بنجاح");
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => t.id !== dialogTodo.id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowDeleteModal(false);
    showHideToast("تم حذف المهمة بنجاح");
  }
  function showDeleteDaialog(todo) {
    setDialogTodo(todo);
    setShowDeleteModal(true);
  }
  const todosJsx = todosToBeRendered.map((todo) => (
    <Todo
      key={todo.id}
      todo={todo}
      showDeleteDaialog={showDeleteDaialog}
      showUpdateDialog={showUpdateDialog}
    />
  ));
  return (
    <>
      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275, textAlign: "center" }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography variant="h2" sx={{ fontWeight: "700" }}>
              مهامي
            </Typography>
            <Divider />
            {/* Filter Buttons */}
            <ToggleButtonGroup
              style={{ direction: "ltr", marginTop: "20px" }}
              value={displayedTodosType}
              exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
              color="primary"
            >
              <ToggleButton value="non-completed">الغير منجز</ToggleButton>
              <ToggleButton value="completed">المنجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/* End of Filter Buttons */}
            {/* Todo List */}
            {todosJsx}
            {/* End of Todo List */}
            {/* Add Todo Button */}
            <Grid
              container
              // spacing={2}
              style={{
                marginTop: "20px",
                direction: "ltr",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Grid width={"63%"}>
                <TextField
                  fullWidth
                  label="أضف مهمة جديدة"
                  id="outlined-basic"
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>
              <Grid width={"35%"}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    fontWeight: "700",
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={() => {
                    handleAddClick();
                  }}
                  disabled={titleInput.trim() === ""}
                >
                  أضافة
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
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
          <DialogContent id="alert-dialog-description">
            لن تتمكن من التراجع عن هذا الإجراء
          </DialogContent>
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
            id="title"
            name="email"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            onChange={(e) =>
              dialogTodo &&
              setDialogTodo({ ...dialogTodo, title: e.target.value })
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
            onChange={(e) =>
              dialogTodo &&
              setDialogTodo({ ...dialogTodo, details: e.target.value })
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
    </>
  );
}
