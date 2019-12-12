package ru.ifmo.se.s267880.pip.lab4.beans;

import ru.ifmo.se.s267880.pip.lab4.entities.UserEntity;

import javax.enterprise.context.SessionScoped;
import java.io.Serializable;

@SessionScoped
public class AppStateBean implements Serializable {
    private UserEntity user = null;

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
