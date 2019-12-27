package ru.ifmo.se.s267880.pip.lab4.entities;

import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.persistence.*;
import java.util.*;

@Entity
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String passwordHash;

    @OneToMany(
            mappedBy = "owner",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<CheckingHitQueryEntity> ownedQueries;

    public UserEntity() {
    }

    public UserEntity(String email, String passwordHash) {
        this.email = email;
        this.passwordHash = passwordHash;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public List<CheckingHitQueryEntity> getOwnedQueries() {
        return ownedQueries;
    }

    public void addOwnedQuery(CheckingHitQueryEntity query) {
        ownedQueries.add(query);
        query.setOwner(this);
    }

    public JsonObjectBuilder getJsonBuilder(boolean withQueries) {
        JsonObjectBuilder builder = Json.createObjectBuilder();
        builder.add("email", email);
        if (withQueries) {
            JsonArrayBuilder queryJsonArr = Json.createArrayBuilder();
            if (ownedQueries != null) {
                for (ListIterator<CheckingHitQueryEntity> it = ownedQueries.listIterator(ownedQueries.size()); it.hasPrevious(); ) {
                    queryJsonArr.add(it.previous().getJsonBuilder().build());
                }
            }
            builder.add("queries", queryJsonArr.build());
        }
        return builder;
    }
}
