const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const bgColorPicker = document.getElementById("bg-color-picker");

// Default todos
const defaultTodos = [
  { text: "Wake up in Peace and gratitude (regardless of the scenario)", completed: false },
  { text: "Brush Your Teeth", completed: false },
  { text: "Practice Olive Oil Pulling (try for 15 minutes)", completed: false },
  { text: "Drink Alkaline Water", completed: false },
  { text: "Drink a Fresh Shot of Olive oil", completed: false },
  { text: "Stretch Your Body and Remind yourself to Keep Good Posture", completed: false },
  { text: "No Granulated Sugar, No Processed foods. Ever", completed: false },
  { text: "Mew Throughout the day Continuously with other Jaw Exercises", completed: false },
  { text: "Do Pushups, Good Form", completed: false },
  { text: "Drink Alkaline Water", completed: false },
  { text: "Open Up Your Todo List, Add Anything if Needed.", completed: false },
  { text: "Get your Money", completed: false },
  { text: "Spend as Little as Possible while saving as much as possible", completed: false },
  { text: "Out-Work Everyone else. (Find a High Paying Opportunity & Stay Down)", completed: false },
  { text: "Consistently Eat Clean and Vibrant alkaline meals Throughout the day", completed: false },
  { text: "Take a Shower, (If Needed, Clip your Toe/Fingernails and Beard.)", completed: false },
  { text: "Brush Your Teeth", completed: false },
  { text: "Practice Olive Oil Pulling (try for 15 minutes)", completed: false },
  { text: "Drink Alkaline Water", completed: false },
  { text: "Drink a Fresh Shot of Olive oil", completed: false },
  { text: "Sleep in Peace and gratitude (regardless of the scenario)", completed: false }
];

// Load todos from localStorage or default
let todos = JSON.parse(localStorage.getItem("todos"));
if (!todos || todos.length === 0) {
  todos = defaultTodos;
  localStorage.setItem("todos", JSON.stringify(todos));
}

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
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
const savedBgColor = localStorage.getItem("bgColor");
if (savedBgColor) {
  document.body.style.background = savedBgColor;
  bgColorPicker.value = savedBgColor;
} else {
  bgColorPicker.value = "#66727a"; 
}

bgColorPicker.addEventListener("input", e => {
  const color = e.target.value;
  document.body.style.background = color;
  localStorage.setItem("bgColor", color);
});
