package ru.ifmo.se.s267880.pip.lab4;

import ru.ifmo.se.s267880.pip.lab4.exceptions.UserExistedException;

import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.*;
import java.util.function.Supplier;

@Path("user-entry")
@RequestScoped
public class UserEntryServices {
    @EJB private ValidatorBean validator;
    @EJB private DatabaseServicesBean databaseServices;
    @EJB private HashGenerator hashGenerator;

    @Inject AppState appState;

    private JsonObject buildSimpleJsonResponse(Supplier<String> supplier) {
        String message = supplier.get();
        if (message == null) {
            return Json.createObjectBuilder()
                    .add("status", "success")
                    .add("message", "")
                    .build();
        } else {
            return Json.createObjectBuilder()
                    .add("status", "fail")
                    .add("message", message)
                    .build();
        }
    }

    @POST
    @Path("register")
    @Produces("text/json")
    public String register(
            @FormParam("email") String email,
            @FormParam("password") String password
    ) {
        return buildSimpleJsonResponse(() -> {
            if (appState.getUser() != null) {
                return "You need to log out first.";
            }
            if (!validator.isEmail(email)) {
                return "User name must be an email.";
            }
            if (!validator.isGoodPassword(password)) {
                return "Password is not strong enough";
            }
            UserEntity user = new UserEntity(email, hashGenerator.getHash(password));
            try {
                user = databaseServices.add(user);
                appState.setUser(user);
            } catch (UserExistedException ex) {
                return ex.getMessage();
            }
            return null;

        }).toString();
    }

    @GET
    @Path("/logout")
    @Produces("text/json")
    public String logout() {
        return buildSimpleJsonResponse(() -> {
            if (appState.getUser() == null) {
                return "You need to login first in order to logout.";
            }
            appState.setUser(null);
            return null;
        }).toString();
    }
}
