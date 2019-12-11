package ru.ifmo.se.s267880.pip.lab4;

import javax.ejb.Singleton;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

@Singleton
public class ValidatorBean {
    public boolean isEmail(String email) {
        try {
            new InternetAddress(email).validate();
        } catch (AddressException ex) {
            return false;
        }
        return true;
    }

    public boolean isGoodPassword(String password) {
        // TODO check more than length
        return password.length() >= 6;
    }
}
