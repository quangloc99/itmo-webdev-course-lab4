package ru.ifmo.se.s267880.pip.lab4.beans;

import javax.ejb.Local;

@Local
public interface IHashGeneratorBean {
    String getHash(char[] string);
    boolean validate(char[] sourceString, String hashedString);

    default String getHash(String string) {
        return getHash(string.toCharArray());
    }

    default boolean validate(String sourceString, String hashedString) {
        return validate(sourceString.toCharArray(), hashedString);
    }
}
