package ru.ifmo.se.s267880.pip.lab4.beans;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.ejb.Singleton;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;

/**
 * @author Tran Quang Loc
 */
@Singleton
public class CryptoBean implements IHashGeneratorBean {
    private SecureRandom sr;
    private SecretKeyFactory keyFactory;
    private final char[] PASSWORD_PEPPER = ("JrsWU1QoBW2eDvph").toCharArray();
    private final int N_ITERATION = 1001;
    private final int KEY_LENGTH = 64 * 8;

    public CryptoBean() {
        try {
            sr = SecureRandom.getInstance("SHA1PRNG");
            keyFactory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public byte[] generateSalt() {
        byte[] salt = new byte[16];
        sr.nextBytes(salt);
        return salt;
    }

    @Override
    public String getHash(char[] pass) {
        return getHashWithCustomSalt(pass, generateSalt());
    }

    public String getHashWithCustomSalt(char[] password, byte[] salt) {
        try {
            char[] pepperedPassword = new char[password.length + PASSWORD_PEPPER.length];
            System.arraycopy(password, 0, pepperedPassword, 0, password.length);
            System.arraycopy(PASSWORD_PEPPER, 0, pepperedPassword, password.length, PASSWORD_PEPPER.length);
            PBEKeySpec keySpec = new PBEKeySpec(pepperedPassword, salt, N_ITERATION, KEY_LENGTH);
            byte[] key = keyFactory.generateSecret(keySpec).getEncoded();
            Base64.Encoder b64e = Base64.getEncoder();
            return String.format("%s:%s", b64e.encodeToString(salt), b64e.encodeToString(key));
        } catch (InvalidKeySpecException e) {
            throw new RuntimeException("InvalidKeySpecException should not be thrown", e);
        }
    }

    @Override
    public boolean validate(char[] password, String hashedPassword) {
        String[] hashedParts = hashedPassword.split(":");
        String newHashedPassword = getHashWithCustomSalt(password, Base64.getDecoder().decode(hashedParts[0]));
        return newHashedPassword.equals(hashedPassword);
    }
}
