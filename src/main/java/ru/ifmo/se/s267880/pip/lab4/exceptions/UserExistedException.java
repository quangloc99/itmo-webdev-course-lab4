package ru.ifmo.se.s267880.pip.lab4.exceptions;

public class UserExistedException extends Exception {
    public static UserExistedException withEmail(String email) {
        return new UserExistedException(String.format("User with email %s existed.", email));
    }

    public static UserExistedException withEmail(String email, Throwable cause) {
        return new UserExistedException(String.format("User with email %s existed.", email), cause);
    }

    public UserExistedException(String msg) {
        super(msg);
    }

    public UserExistedException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public UserExistedException(Throwable cause) {
        super(cause);
    }
}
