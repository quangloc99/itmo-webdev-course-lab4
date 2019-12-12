package ru.ifmo.se.s267880.pip.lab4;

import ru.ifmo.se.s267880.pip.lab4.exceptions.UserExistedException;

import javax.annotation.Resource;
import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.function.Supplier;

@Path("user-entry")
@RequestScoped
public class UserEntryServices {
    @EJB private ValidatorBean validator;
    @EJB private DatabaseServicesBean databaseServices;
    @EJB private HashGenerator hashGenerator;

    @Inject AppState appState;

    @POST
    @Path("register")
    @Produces("application/json")
    public Response register(
            @FormParam("email") String email,
            @FormParam("password") String password
    ) {
        if (email == null || !validator.isEmail(email)) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(SimpleMessage.fail("Invalid email")).build();
        }
        if (password == null || !validator.isGoodPassword(password)) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(SimpleMessage.fail("Password not exist or not strong enough")).build();
        }
        if (appState.getUser() != null) {
            return Response.status(Response.Status.FORBIDDEN)
                    .entity(SimpleMessage.fail("You need to logout first")).build();
        }

        try {
            UserEntity user = new UserEntity(email, hashGenerator.getHash(password));
            user = databaseServices.add(user);
            appState.setUser(user);
            return Response.ok().entity(SimpleMessage.success("")).build();
        } catch (UserExistedException ex) {
            return Response.status(Response.Status.FORBIDDEN)
                    .entity(SimpleMessage.fail(ex.getMessage())).build();
        }
    }

    @POST
    @Path("/logout")
    @Produces("application/json")
    public Response logout() {
        if (appState.getUser() == null) {
            return Response.status(Response.Status.FORBIDDEN)
                    .entity(SimpleMessage.fail("You need to login first in order to logout.")).build();
        }
        appState.setUser(null);
        return Response.ok().entity(SimpleMessage.success("")).build();
    }
}
