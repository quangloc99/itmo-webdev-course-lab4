package ru.ifmo.se.s267880.pip.lab4;

import ru.ifmo.se.s267880.pip.lab4.exceptions.UserExistedException;

import javax.ejb.EJB;
import javax.json.Json;
import javax.ws.rs.*;

@Path("user-entry")
public class UserEntryServices {
    @EJB private ValidatorBean validator;
    @EJB private DatabaseServicesBean databaseServices;
    @EJB private HashGenerator hashGenerator;

    @POST
    @Path("register")
    @Produces("text/json")
    public String register(
            @FormParam("email") String email,
            @FormParam("password") String password
    ) {
        String errorMessage = null;
        if (!validator.isEmail(email)) {
            errorMessage = "User name must be an email.";
        } else if (!validator.isGoodPassword(password)) {
            errorMessage = "Password is not strong enough";
        }

        UserEntity user = new UserEntity(email, hashGenerator.getHash(password));
        try {
            user = databaseServices.add(user);
        } catch (UserExistedException ex) {
            errorMessage = ex.getMessage();
        }
        if (errorMessage != null) {
            return Json.createObjectBuilder()
                    .add("status", "fail")
                    .add("message", errorMessage)
                    .build().toString();
        }

        return Json.createObjectBuilder()
                .add("status", "success")
                .add("message", "")
                .build().toString();
    }
}
