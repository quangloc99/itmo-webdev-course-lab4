package ru.ifmo.se.s267880.pip.lab4;

public class SimpleMessage {
    public enum Status { SUCCESS, FAIL; }

    private Status status;
    private String message = "";

    public SimpleMessage(Status status, String message) {
        this.status = status;
        this.message = message;
    }

    public static SimpleMessage success(String message) {
        return new SimpleMessage(Status.SUCCESS, message);
    }

    public static SimpleMessage fail(String message) {
        return new SimpleMessage(Status.FAIL, message);
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
