function addTask(taskName, taskID, taskCompleted) {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.id = `task-${taskID}`;
    taskItem.innerHTML = `
        <span class="task-name">${taskName}</span>
        <button class="edit"><i class="fa-duotone fa-regular fa-pen-to-square"></i></button>
        <button class="completed"><i class="fa-solid fa-check"></i></button>
        <button class="delete"><i class="fa-solid fa-delete-left"></i></button>
        <button class="save" style="display: none;"><i class="fa-solid fa-floppy-disk"></i></button>
    `;

    const tasksContainer = document.getElementById("tasks");
    if (!tasksContainer) {
        console.error("#tasks container not found!");
        return;
    }

    
    if (taskCompleted) {
        taskItem.style.backgroundColor = "#d4edda";  
        taskItem.querySelector(".edit").style.display = "none";
        taskItem.querySelector(".completed").style.display = "none";
        taskItem.querySelector(".delete").style.display = "none";
        taskItem.querySelector(".save").style.display = "none";
        const allButtons = taskItem.querySelectorAll("button");
        allButtons.forEach((button) => {
            button.disabled = true;  
        });
    }

    tasksContainer.appendChild(taskItem);

    const editBtn = taskItem.querySelector(".edit");
    const completedBtn = taskItem.querySelector(".completed");
    const deleteBtn = taskItem.querySelector(".delete");
    const saveBtn = taskItem.querySelector(".save");
    const taskNameSpan = taskItem.querySelector(".task-name");

    
    editBtn.addEventListener("click", () => {
        taskNameSpan.style.display = "none";
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = taskNameSpan.textContent;
        inputField.id = "taskNameInput";
        taskItem.insertBefore(inputField, taskNameSpan);

        editBtn.style.display = "none";
        completedBtn.style.display = "none";
        deleteBtn.style.display = "none";
        saveBtn.style.display = "inline-block";

        saveBtn.addEventListener("click", () => {
            const newTaskName = inputField.value.trim();
            if (newTaskName !== "") {
                updateTask(taskID, newTaskName, taskCompleted);
                taskNameSpan.textContent = newTaskName;
            }

            inputField.remove();
            taskNameSpan.style.display = "inline";
            editBtn.style.display = "inline-block";
            completedBtn.style.display = "inline-block";
            deleteBtn.style.display = "inline-block";
            saveBtn.style.display = "none";
        });
    });

    
    completedBtn.addEventListener("click", () => {
        taskCompleted = true;
        updateTask(taskID, taskNameSpan.textContent, taskCompleted);
        taskItem.style.backgroundColor = "#d4edda";  
        taskItem.querySelector(".edit").style.display = "none";
        taskItem.querySelector(".completed").style.display = "none";
        taskItem.querySelector(".delete").style.display = "none";
        taskItem.querySelector(".save").style.display = "none";
        const allButtons = taskItem.querySelectorAll("button");
        allButtons.forEach((button) => {
            button.disabled = true;  
        });
    });

    
    deleteBtn.addEventListener("click", () => {
        deleteTask(taskID);
        tasksContainer.removeChild(taskItem);
    });
}


function updateTask(taskID, taskName, taskCompleted) {
    const url = `http://localhost:8080`;
    const taskData = {
        taskId: taskID,
        taskName: taskName,
        taskStatus: taskCompleted,
    };

    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
    }).catch((error) => console.error("Error:", error));
}


function deleteTask(taskID) {
    const url = `http://localhost:8080/${taskID}`;
    fetch(url, {
        method: "DELETE",
    }).catch((error) => console.error("Error:", error));
}


let addBtn = document.getElementById("submit");
addBtn.addEventListener("click", () => {
    const taskNameInput = document.getElementById("taskName");
    const taskName = taskNameInput.value;

    const url = "http://localhost:8080";
    const taskData = {
        taskName: taskName,
        taskStatus: false,
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
    })
        .then((response) => response.json())
        .then((data) => {
            addTask(data.taskName, data.taskId, data.taskStatus);
        })
        .catch((error) => console.error("Error:", error));
});


fetch("http://localhost:8080")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((task) => {
            addTask(task.taskName, task.taskId, task.taskStatus);
        });
    })
    .catch((error) => console.error("Error fetching data:", error));
