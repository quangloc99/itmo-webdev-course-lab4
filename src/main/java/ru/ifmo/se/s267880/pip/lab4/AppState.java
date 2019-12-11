package ru.ifmo.se.s267880.pip.lab4;

import javax.enterprise.context.SessionScoped;
import javax.inject.Named;
import java.io.Serializable;

@SessionScoped
public class AppState implements Serializable {
    private UserEntity user = null;

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
