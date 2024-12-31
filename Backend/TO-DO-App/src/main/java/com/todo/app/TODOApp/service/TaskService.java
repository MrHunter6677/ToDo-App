package com.todo.app.TODOApp.service;

import com.todo.app.TODOApp.module.Task;
import com.todo.app.TODOApp.repo.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepo repo;

    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public Task addTask(Task task) {
        return repo.save(task);
    }

    public Task updateTask(Task task) {
        return repo.save(task);
    }

    public void deleteTask(int taskId) {
        repo.deleteById(taskId);
    }
}
