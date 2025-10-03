import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { TodosContext } from "./contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { ToastProvider } from "./contexts/ToastContext";

const theme = createTheme({
  typography: {
    fontFamily: "Amiri, serif",
  },
  palette: {
    primary: {
      main: "#f57c00",
    },
  },
});

const initialTodos = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    description: "التفاصيل الخاصة بالمهمة الاولى",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "ممارسة الرياضة",
    description: "التفاصيل الخاصة بالمهمة الثانية",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "تعلم البرمجة",
    description: "التفاصيل الخاصة بالمهمة الثالثة",
    isCompleted: false,
  },
];

export default function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <div
          className="flex justify-center items-center min-h-screen bg-[#191b1f] "
          style={{ direction: "rtl" }}
        >
          <TodosContext.Provider value={{ todos, setTodos }}>
            <TodoList />
          </TodosContext.Provider>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}
