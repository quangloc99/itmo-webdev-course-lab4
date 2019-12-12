package ru.ifmo.se.s267880.pip.lab4.beans;

import ru.ifmo.se.s267880.pip.lab4.entities.UserEntity;
import ru.ifmo.se.s267880.pip.lab4.exceptions.UserExistedException;

import javax.annotation.PostConstruct;
import javax.ejb.Stateful;
import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.io.Serializable;
import java.util.List;

@Stateful
public class DatabaseServicesBean implements Serializable {
    @PersistenceUnit(unitName = "offline-development-pu")
    private EntityManagerFactory entityManagerFactory;
    private EntityManager entityManager;

    @PostConstruct
    public void postConstruct() {
        entityManager = entityManagerFactory.createEntityManager();
    }

    public UserEntity getUserByEmail(String email) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<UserEntity> cq = cb.createQuery(UserEntity.class);
        Root<UserEntity> root = cq.from(UserEntity.class);
        List<UserEntity> result = entityManager.createQuery(
                cq.select(root).where(cb.equal(root.get("email"), email))
        ).getResultList();
        return result.isEmpty() ? null : result.get(0);
    }

    public UserEntity add(UserEntity entity) throws UserExistedException {
        UserEntity existedUser = getUserByEmail(entity.getEmail());
        if (existedUser != null) {
            throw UserExistedException.withEmail(entity.getEmail());
        }
        entityManager.getTransaction().begin();
        entityManager.persist(entity);
        entityManager.getTransaction().commit();
        return entity;
    }
}
