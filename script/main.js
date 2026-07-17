"use strict";

// DOM elements - all the elements that we need to reference in HTML

const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCountSpan = document.getElementById("taskCount");
const clearAllButton = document.getElementById("clearAllButton");

// The single source of truth: an array of strings

let tasks = [
  { id: 1, text: "Going to town", isCompleted: true },
  { id: 2, text: "Reading the bible", isCompleted: false },
  { id: 3, text: "Going to town", isCompleted: false },
];

// Function to render the list from the array (this is where the LOOPS)

// Old Version of using loops

// function renderTasks() {
//   // Clear the current list in the DOM
//   taskList.innerHTML = "";

//   // if no tasks, show placeholder
//   if (tasks.length === 0) {
//     const placeholder = document.createElement("li");
//     placeholder.className = "placeholder-message";
//     placeholder.textContent = "✨ No tasks yet. Add one above!";
//     taskList.appendChild(placeholder);
//     taskCountSpan.textContent = "0";

//     return;
//   }

//   // LOOP through the array and create <li> for each task

//   for (
//     let taskPosition = 0;
//     taskPosition < tasks.length;
//     taskPosition = taskPosition + 1
//   ) {
//     const task = tasks[taskPosition];
//     const listItem = document.createElement("li");

//     // use template literal to include the task element

//     listItem.innerHTML = `
//         <span>${task}</span>
//         <button class="delete-btn" data-index="${taskPosition}">Delete</button>
//     `;

//     taskList.appendChild(listItem);
//   }

//   // Update task count
//   taskCountSpan.textContent = tasks.length;
// }

// NEW - using map() array method

function renderTasks() {
  // Clear the current list in the DOM
  taskList.innerHTML = "";

  // if no tasks, show placeholder
  if (tasks.length === 0) {
    taskList.innerHTML = `
                    <li class="placeholder-message">
                    ✨ No tasks yet. Add one above!
                    </li>
    `;

    taskCountSpan.textContent = "0";

    return;
  }

  // Create an array of HTML strings using .map(), then join them

  const taskItems = tasks
    .map(({ id, text, isCompleted }, index) => {
      // use object properties instead of parallel arrays

      const textStyle = isCompleted
        ? "text-decoration: line-through; color: #94a3b8;"
        : "";

      const completedButtonText = isCompleted ? "🤦‍♂️Undo" : "👍Done";

      return `
            <li>
                <span style="${textStyle}">${text}</span>
                <div>
                    <button class="complete-btn" data-index="${index}">
                        ${completedButtonText}
                    </button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
                
            </li>
    
    `;
    })
    .join("");

  taskList.innerHTML = taskItems;

  // Use filter() to count incomplete tasks

  const incompleteCount = tasks.filter((task) => {
    return !task.isCompleted;
  }).length;
  taskCountSpan.textContent = incompleteCount;
}

// Function / method to add a new task

// Add task now pushes an OBJECT

function addTask() {
  const newTask = taskInput.value.trim();

  if (newTask === "") {
    console.log("please type a task first!");

    return;
  }

  // Add a task item to the tasks array

  tasks.push({
    id: Date.now(), // unique ID based on a timestamp
    text: newTask,
    isCompleted: false,
  });

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
  const completeButton = event.target.closest(".complete-btn");

  if (deleteButton) {
    const index = deleteButton.getAttribute("data-index");

    if (index !== null) {
      handleDelete(parseInt(index));
    }
  }

  if (completeButton) {
    const index = parseInt(completeButton.getAttribute("data-index"));
    tasks[index].isCompleted = !tasks[index].isCompleted; // toggle
    renderTasks();

    return;
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

// function doublesTheNumber(number) {
//   return number + number;
// }

// const result = doublesTheNumber(5);

// console.log(result);

// This function does something but returns nothing (undefined)

// Side effects
// function logDouble(number) {
//   console.log(number + number);
// }

// logDouble(2);

// let age;

// console.log(age);

// Pure function - give input and always returns the output, no side effects

// function addTax(price) {
//   const tax = 2000;
//   const totalAmount = price + tax;

//   return totalAmount;
// }

// const person1 = addTax(3000);
// const person2 = addTax(20000);
// const person3 = addTax(5000);

// console.log(person1, person2, person3);

// const todayShoopers = [person1, person2, person3];

// IMPURE function - depends on something outside (bad for predictability)

// let taxRate = 200;

// function addTaxImpure(price) {
//   const totalAmount = price + taxRate;

//   return totalAmount;
// }

// const joseph = addTaxImpure(700);

// console.log(joseph);

// // Example

// function degreesFahrenheit(degrees) {
//   const celsiusToFahrenheit = (degrees * 9) / 5 + 32;

//   return celsiusToFahrenheit;
// }

// const result1 = degreesFahrenheit(0);
// const result2 = degreesFahrenheit(100);

// console.log(result1, result2);

// Phase 2: The Big Three Array methods - map(), filter(), reduce()  ////

// map() Array method

// old method
// function convertsToUGX(priceArray) {
//   const priceInUGX = [];
//   const exchangeRate = 3600;

//   for (
//     let priceItem = 1;
//     priceItem < priceArray.length;
//     priceItem = priceItem + 1
//   ) {
//     const dollarToShs = priceItem * exchangeRate;

//     priceInUGX.push(dollarToShs);
//   }

//   return priceInUGX;
// }

// const pricesInUSD = [10, 25, 30, 45, 60];

// const pricesInShs = convertsToUGX(pricesInUSD);

// console.log(pricesInShs);

// map() method

// Example 1).

// function convertsToUGX(pricesArray) {
//   const priceInUGX = [];

//   pricesArray.map((priceItem) => {
//     const exchangeRate = 3600;
//     const convertedPrice = priceItem * exchangeRate;

//     priceInUGX.push(convertedPrice);
//   });

//   return priceInUGX;
// }

// const pricesInUSD = [10, 25, 30, 45, 60];

// const pricesInShs = convertsToUGX(pricesInUSD);

// console.log(pricesInShs);

// // Example 2)

// function capitalizesFirstLetter(namesArray) {
//   const capitalizedArray = [];

//   namesArray.map((name) => {
//     const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

//     capitalizedArray.push(capitalizedName);
//   });

//   return capitalizedArray;
// }

// const names = ["alice", "bob", "charlie"];

// const upperCaseNamesArray = capitalizesFirstLetter(names);

// console.log(upperCaseNamesArray);

// filter() method

// const pricesInUSD = [10, 25, 30, 45, 60];
// const pricesInEuro = [3, 9, 70, 64, 34, 25, 22, 80, 76];

// const expensiveList1 = pricesInUSD.filter((prices) => {
//   return prices < 25;
// });

// const expensiveList2 = pricesInEuro.filter((prices) => {
//   return prices < 20;
// });

// const words = ["apple", "banana", "grapes", "kiwi"];

// const longwords = words.filter((word) => {
//   return word.length > 4;
// });

// console.log(expensiveList1, expensiveList2);
// console.log(longwords);

// reduce() array method

// Sum all prices

// const prices = [10, 25, 30, 45, 60];

// const total = prices.reduce((accumulator, current) => {
//   return accumulator + current;
// }, 0); // 0 is the starting value

// console.log(total);

// const maxPrice = prices.reduce((accumulator, current) => {
//   if (accumulator > current) {
//     return accumulator;
//   }

//   return current;
// });

// console.log(maxPrice);

// Phase 3: Refactor the Task Master - Applying what We learned

// Exercise (10 minutes)

// const products = [
//   { name: "Laptop", price: 1200, inStock: true },
//   { name: "Mouse", price: 25, inStock: true },
//   { name: "Keyboard", price: 75, inStock: false },
//   { name: "Monitor", price: 300, inStock: true },
//   { name: "Headphones", price: 150, inStock: false },
// ];

// 1. Filter to only in-stock products

// const inStockItems = products.filter((product) => product.inStock);

// // 2. Map to show only the name and price
// const itemPrices = inStockItems.map((product) => {
//   return `name: ${product.name}, price: ${product.price}`;
// });

// const totalValue = inStockItems
//   .map((product) => product.price)
//   .reduce((acc, price) => acc + price);

// console.log(itemPrices);

// console.log(totalValue);

// 3. reduce to find the total value of in-stock inventory

////// Lesson 5: The DNA of the WEB

// Goal: Understanding Objects (key-value pairs), destructuring, the spread operator

// Phase 0: The Parallel Arrays

// introduce the syntax (curly braces {})

// A single task, as an OBJECT

// const task1 = {
//   id: 1,
//   text: "Going to town",
//   isCompleted: false,
//   priority: "high",
// };

// console.log(task1.text); // Dot notation

// console.log(task1["priority"]); // Bracket notation - rarely used

// // Add methods to objects (function inside)

// const user = {
//   firstName: "Alice",
//   lastName: "Johnson",

//   // getFullName: function () {
//   //   return `${this.firstName} ${this.lastName}`;
//   // },

//   // Modern shorthand (remove 'function' keyword)

//   getFullName() {
//     return `${this.firstName} ${this.lastName}`;
//   },
// };

// console.log(user.getFullName());

// Create an object called car, with make, model, year and a method getAge() that returns the current year minus the car's year.

// let tasksArray = [
//   { id: 1, text: "Going to town", isCompleted: true },
//   { id: 2, text: "Reading the bible", isCompleted: false },
//   { id: 1, text: "Going to town", isCompleted: false },
// ];

// const incompleteTasks = tasksArray.filter((task) => task.isCompleted === false);

// console.log(incompleteTasks);

// const taskText = tasksArray.map((task) => task.text);

// console.log(taskText);

// Phase 3: Destructuring - The "clean Hands" Techinique

// const user = { name: "Bob", age: 25, city: "Kampala" };

// const userName = user.name;

// const userAge = user.age;

// console.log(userName, userAge);

// const { name, age } = user;

// console.log(name, age);

//// The problem (mutating directly Obj - BAD)

// const taskObj = { text: "Old Task", done: false };

// taskObj.done = true; // Mutating the original obj - can cause unexpected side effects

// console.log(taskObj);

//// The solution (spread Operator - GOOD)

const taskObj = { text: "Old Task", done: false };

const updatedTaskObj = { ...taskObj, done: true }; // Creates a NEW Object

console.log(taskObj); // OLD Obj (unchanged)

console.log(updatedTaskObj); // New Obj (updated Version)
