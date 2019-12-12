package ru.ifmo.se.s267880.pip.lab4.services;

import ru.ifmo.se.s267880.pip.lab4.beans.AppStateBean;
import ru.ifmo.se.s267880.pip.lab4.beans.DatabaseServicesBean;
import ru.ifmo.se.s267880.pip.lab4.beans.StringUtilsBean;
import ru.ifmo.se.s267880.pip.lab4.entities.CheckingHitQueryEntity;
import ru.ifmo.se.s267880.pip.lab4.helpers.SimpleMessage;

import javax.ejb.EJB;
import javax.ejb.EJBException;
import javax.inject.Inject;
import javax.json.JsonObject;
import javax.json.bind.JsonbBuilder;
import javax.validation.constraints.Null;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

@Path("/app")
public class MainAppServices {
    @EJB private StringUtilsBean stringUtils;
    @EJB private DatabaseServicesBean databaseServices;
    @Inject private AppStateBean appState;

    @GET
    @Path("/check-hit")
    @Produces("application/json")
    public Response addCheckHitQuery(
            @QueryParam("x") String x,
            @QueryParam("y") String y,
            @QueryParam("r") String r
    ) {
        try {
            CheckingHitQueryEntity query = new CheckingHitQueryEntity(
                stringUtils.customToBigDecimal(x),
                stringUtils.customToBigDecimal(y),
                stringUtils.customToBigDecimal(r)
            );

            SimpleMessage msg = SimpleMessage.success("");
            if (appState.getUser() != null) {
                appState.getUser().addOwnedQuery(query);
                databaseServices.addQuery(query);
            } else {
                msg.setMessage("This query has no owner since you did not log in.");
            }
            JsonObject res = msg.getJsonBuilder()
                    .add("query", query.getJsonBuilder().build())
                    .build();
            return Response.ok().entity(res.toString()).build();
        } catch (NullPointerException | EJBException e) {
            if (e instanceof EJBException) {
                if (!(e.getCause() instanceof NullPointerException)) {
                    throw e;
                }
            }
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(SimpleMessage.fail("Missing parameters")).build();
        } catch (NumberFormatException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(SimpleMessage.fail(e.getMessage())).build();
        }
    }
}
