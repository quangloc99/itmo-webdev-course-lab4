package ru.ifmo.se.s267880.pip.lab4.beans;

import javax.ejb.Singleton;
import java.math.BigDecimal;
import java.util.Objects;

@Singleton
public class StringUtilsBean {
    public BigDecimal customToBigDecimal(String num) {
        Objects.requireNonNull(num, "Number must not be null");
        return new BigDecimal(num.replace(',', '.'));
    }
}
