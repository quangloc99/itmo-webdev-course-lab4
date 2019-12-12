package ru.ifmo.se.s267880.pip.lab4.helpers;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

import javax.json.Json;
import javax.json.JsonObjectBuilder;

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

    public JsonObjectBuilder getJsonBuilder() {
        return Json.createObjectBuilder()
                .add("status", status.name())
                .add("message", message);
    }
}
