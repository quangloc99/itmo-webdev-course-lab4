package ru.ifmo.se.s267880.pip.lab4.entities;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
public class CheckingHitQueryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal x = BigDecimal.ZERO;
    private BigDecimal y = BigDecimal.ZERO;
    private BigDecimal r = BigDecimal.ZERO;
    private boolean result = true;

    public CheckingHitQueryEntity() {
    }

    public CheckingHitQueryEntity(BigDecimal x, BigDecimal y, BigDecimal r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = checkHit();
    }

    private boolean checkHit() {
        if (x.signum() >= 0 && y.signum() >= 0) {
            return (
                    x.multiply(BigDecimal.valueOf(2)).compareTo(r) <= 0 &&
                    y.compareTo(r) <= 0
            );
        }

        if (x.signum() >= 0 && y.signum() < 0) {
            return x.subtract(y).compareTo(r) >= 0;
        }

        if (x.signum() < 0 && y.signum() >= 0) {
            return x.multiply(x).add(y.multiply(y))
                    .compareTo(r.multiply(r).divide(BigDecimal.valueOf(4))) <= 0;
        }

        return false;
    }


    public BigDecimal getX() {
        return x;
    }

    public void setX(BigDecimal x) {
        this.x = x;
        result = checkHit();
    }

    public BigDecimal getY() {
        return y;
    }

    public void setY(BigDecimal y) {
        this.y = y;
        result = checkHit();
    }

    public BigDecimal getR() {
        return r;
    }

    public void setR(BigDecimal r) {
        this.r = r;
        result = checkHit();
    }
}
