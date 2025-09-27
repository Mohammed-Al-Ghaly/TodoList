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
//
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";

import { TodosContext } from "../contexts/todosContext";

import { useState, useContext, useEffect } from "react";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // Filteration Arrays
  const completedTodos = todos.filter((t) => t.isCompleted);

  const notCompletedTodos = todos.filter((t) => !t.isCompleted);

  let todosToBeRendered = todos;
  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  const todosJsx = todosToBeRendered.map((todo) => (
    <Todo key={todo.id} todo={todo} />
  ));

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

  return (
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
  );
}
