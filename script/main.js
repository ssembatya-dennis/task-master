"use-strict";

// DOM elements - all the elements that we need to reference in HTML

const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCountSpan = document.getElementById("taskCount");
const clearAllButton = document.getElementById("clearAllButton");

// The single source of truth: an array of strings

let tasks = [];

// Function to render the list from the array (this is where the LOOPS)

function renderTasks() {
  // Clear the current list in the DOM
  taskList.innerHTML = "";

  // if no tasks, show placeholder
  if (tasks.length === 0) {
    const placeholder = document.createElement("li");
    placeholder.className = "placeholder-message";
    placeholder.textContent = "✨ No tasks yet. Add one above!";
    taskList.appendChild(placeholder);
    taskCountSpan.textContent = "0";

    return;
  }

  // LOOP through the array and create <li> for each task

  for (
    let taskPosition = 0;
    taskPosition < tasks.length;
    taskPosition = taskPosition + 1
  ) {
    const task = tasks[taskPosition];
    const listItem = document.createElement("li");

    // use template literal to include the task element

    listItem.innerHTML = `
        <span>${task}</span>
        <button class="delete-btn" data-index="${taskPosition}">Delete</button>
    `;

    taskList.appendChild(listItem);
  }

  // Update task count
  taskCountSpan.textContent = tasks.length;
}

// Function / method to add a new task

function addTask() {
  const newTask = taskInput.value.trim();

  if (newTask === "") {
    console.log("please type a task first!");

    return;
  }

  // Add a task item to the tasks array

  tasks.push(newTask);

  // Re-render the whole list with the new task that's added
  renderTasks();

  // Clear input and refocus
  taskInput.value = "";
  taskInput.focus();
}

// Function to delete a task
function handleDelete(index) {
  tasks.splice(index, 1); // remove 1 item at that index from the array

  renderTasks(); // re-render with updated array
}

//Event delegation: listen for clicks on the whole UL, but check if it's a delete button

taskList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete-btn");

  if (!deleteButton) return;

  const index = deleteButton.getAttribute("data-index");

  if (index !== null) {
    handleDelete(parseInt(index));
  }
});

//clear all task

function clearAllTasks() {
  if (tasks.length > 0 && confirm("Delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
}

// wire up the buttons
addButton.addEventListener("click", addTask);
clearAllButton.addEventListener("click", clearAllTasks);

// Allow pressing Enter in the input field

taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

// Initial render (empty list -- when there's no task added)
renderTasks();

////////////////////////// Different loops format

// const tasks = ["Watching Netflix", "Reading the bible", "Going to town"];

// for loop
// for (
//   let taskPosition = 0;
//   taskPosition < tasks.length;
//   taskPosition = taskPosition + 1
// ) {
//   console.log(tasks[taskPosition]);
// }

// for (const task of tasks) {
//   console.log(task);
// }

// tasks.forEach((task, index) => {
//   console.log(`${index}: ${task}`);
// });

/////////////////// Lesson 4: Functions That Return & Array Superpowers ///////////

// The "old" way (lesson 3) -

// for (let i = 0; i < tasks.length; i++) {
//     const taskText = tasks[i]

//     // ... Create DOM element
// }

// // The "modern" way - declarative and cleaner

// tasks.map((taskText, index) => {
//     // ... Create DOM element
// })

// Phase 1: Functions That Return Values

// A function that Returns a value

function doublesTheNumber(number) {
  return number + number;
}

const result = doublesTheNumber(5);

console.log(result);

// This function does something but returns nothing (undefined)

// Side effects
function logDouble(number) {
  console.log(number + number);
}

logDouble(2);

let age;

console.log(age);

// Pure function - give input and always returns the output, no side effects

function addTax(price) {
  const tax = 2000;
  const totalAmount = price + tax;

  return totalAmount;
}

const person1 = addTax(3000);
const person2 = addTax(20000);
const person3 = addTax(5000);

console.log(person1, person2, person3);

const todayShoopers = [person1, person2, person3];

// IMPURE function - depends on something outside (bad for predictability)

let taxRate = 200;

function addTaxImpure(price) {
  const totalAmount = price + taxRate;

  return totalAmount;
}

const joseph = addTaxImpure(700);

console.log(joseph);
