package iuh.fit.subject;

import iuh.fit.Observer.Observer;

import java.util.ArrayList;
import java.util.List;

public class Task implements Subject {
    private String taskName;
    private String status;
    private List<Observer> observers;

    public Task(String taskName, String status) {
        this.taskName = taskName;
        this.status = status;
        this.observers = new ArrayList<>();
    }

    @Override
    public void attach(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void detach(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(taskName, status);
        }
    }

    public void setStatus(String status) {
        this.status = status;
        System.out.println("Task [" + taskName + "] cập nhật trạng thái: " + status);
        notifyObservers();
    }

    public String getTaskName() {
        return taskName;
    }

    public String getStatus() {
        return status;
    }
}
