package ru.ifmo.se.s267880.pip.lab4;

import ru.ifmo.se.s267880.pip.lab4.exceptions.UserExistedException;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.io.Serializable;
import java.util.List;

@Stateless
public class DatabaseServicesBean implements Serializable {
    static private EntityManagerFactory entityManagerFactory;

    static {
        entityManagerFactory = Persistence.createEntityManagerFactory("offline-development-pu");
    }

    private EntityManager entityManager;
    public DatabaseServicesBean() {
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

    public void add(UserEntity entity) throws UserExistedException {
        UserEntity existedUser = getUserByEmail(entity.getEmail());
        if (existedUser != null) {
            throw UserExistedException.withEmail(entity.getEmail());
        }
        entityManager.getTransaction().begin();
        entityManager.persist(entity);
        entityManager.getTransaction().commit();
    }
}
