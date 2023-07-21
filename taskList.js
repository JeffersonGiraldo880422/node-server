const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let tasks = [];

function addTask() {
  rl.question('Introduce la descripción de la tarea: ', (description) => {
    const task = {
      id: tasks.length + 1,
      description: description,
      completed: false
    };
    tasks.push(task);
    console.log(`Tarea "${description}" agregada.`);
    showMenu();
  });
}

function removeTask() {
  rl.question('Introduce el ID de la tarea que deseas eliminar: ', (taskId) => {
    const id = parseInt(taskId);
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      console.log(`Tarea con ID ${id} eliminada.`);
    } else {
      console.log(`El ID que introdujiste no es válido, proporciona un ID existente.`);
    }
    showMenu();
  });
}

function completeTask() {
  rl.question('Introduce el ID de la tarea que deseas marcar como completada: ', (taskId) => {
    const id = parseInt(taskId);
    const task = tasks.find(task => task.id === id);
    if (task) {
      if (!task.completed) {
        task.completed = true;
        console.log(`Tarea con ID ${id} marcada como completada.`);
      } else {
        console.log(`La tarea con ID ${id} ya fue marcada.`);
      }
    } else {
      console.log(`El ID que introdujiste no es válido, proporciona un ID existente.`);
    }
    showMenu();
  });
}

function uncompleteTask() {
  rl.question('Introduce el ID de la tarea que deseas desmarcar: ', (taskId) => {
    const id = parseInt(taskId);
    const task = tasks.find(task => task.id === id);
    if (task) {
      if (task.completed) {
        task.completed = false;
        console.log(`Tarea con ID ${id} desmarcada.`);
      } else {
        console.log(`La tarea con ID ${id} ya fue desmarcada.`);
      }
    } else {
      console.log(`El ID que introdujiste no es válido, proporciona un ID existente.`);
    }
    showMenu();
  });
}

function showMenu() {
  console.log('--------');
  console.log('Lista de tareas:');
  tasks.forEach(task => {
    const status = task.completed ? '[x]' : '[ ]';
    console.log(`${task.id}. ${status} ${task.description}`);
  });
  console.log('--------');
  console.log('1. Agregar tarea');
  console.log('2. Eliminar tarea');
  console.log('3. Marcar tarea como completada');
  console.log('4. Desmarcar tarea');
  console.log('5. Salir');

  rl.question('Elige una opción: ', (option) => {
    switch (option) {
      case '1':
        addTask();
        break;
      case '2':
        removeTask();
        break;
      case '3':
        completeTask();
        break;
      case '4':
        uncompleteTask();
        break;
      case '5':
        rl.close();
        break;
      default:
        console.log('Opción inválida. Por favor, elige una opción válida.');
        showMenu();
        break;
    }
  });
}

showMenu();
