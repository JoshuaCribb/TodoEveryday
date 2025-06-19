const STORAGE_KEY_TODOS = "todoApp1_todos";
const STORAGE_KEY_BG = "todoApp1_bgColor";

const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const bgColorPicker = document.getElementById("bg-color-picker");

// Default todos
const defaultTodos = [
  { text: "Absolutely NO Proccesed Foods.", completed: false },
  { text: "5 Gallons+ of Alkaline Water, Preferably from the machine", completed: false },
  { text: "Grassfed Beef 3-7 Lbs", completed: false },
  { text: "Organic Avocados", completed: false },
  { text: "GrassFed Butter", completed: false },
  { text: "Organic Blueberries", completed: false },
  { text: "Organic Beef Broth", completed: false },
  { text: "Pasture Raised Eggs", completed: false },
  { text: "Organic Local Honey", completed: false },
  { text: "Celtic Salt", completed: false },
  { text: "Organic Rice", completed: false },
  { text: "Cold Pressed Olive Oil", completed: false },
  { text: "Organic Pasture Raised Chicken", completed: false },
  { text: "Organic Lettuce", completed: false },


];

// Load todos from localStorage or default
let todos = JSON.parse(localStorage.getItem(STORAGE_KEY_TODOS));
if (!todos || todos.length === 0) {
  todos = defaultTodos;
  localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(todos));
}

const saveTodos = () => {
  localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(todos));
};

const renderTodos = () => {
  list.innerHTML = "";
  todos.forEach((todo) => {
    const html = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span class="${todo.completed ? "completed" : ""}">${todo.text}</span>
        <i class="far fa-trash-alt delete"></i>
      </li>
    `;
    list.innerHTML += html;
  });
};

renderTodos();

addForm.addEventListener("submit", e => {
  e.preventDefault();
  const todoText = addForm.add.value.trim();
  if (todoText.length) {
    todos.push({ text: todoText, completed: false });
    saveTodos();
    renderTodos();
    addForm.reset();
  }
});

list.addEventListener("click", e => {
  const clickedLi = e.target.closest("li");
  if (!clickedLi) return;
  const clickedIndex = Array.from(list.children).indexOf(clickedLi);

  if (e.target.classList.contains("delete")) {
    todos.splice(clickedIndex, 1);
    saveTodos();
    renderTodos();
    return;
  }

  todos[clickedIndex].completed = !todos[clickedIndex].completed;
  saveTodos();
  renderTodos();
});

// Background color picker functionality
const savedBgColor = localStorage.getItem(STORAGE_KEY_BG);
if (savedBgColor) {
  document.body.style.background = savedBgColor;
  bgColorPicker.value = savedBgColor;
} else {
  bgColorPicker.value = "#66727a"; 
}

bgColorPicker.addEventListener("input", e => {
  const color = e.target.value;
  document.body.style.background = color;
  localStorage.setItem(STORAGE_KEY_BG, color);
});
