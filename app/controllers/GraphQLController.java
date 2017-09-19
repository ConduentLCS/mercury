package controllers;

import com.coxautodev.graphql.tools.SchemaParser;
import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import models.ClusterRepository;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.Query;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's graphql requests
 */
public class GraphQLController extends Controller {

    /**
     * An action that renders an HTML page with a graphiql plugins.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>graphiql</code> .
     */
    public Result index() {
        return ok(views.html.graphql.render());
    }

    /**
     * An action handles graphql query.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET/POST</code> request with a path of <code>graphql</code> .
     */
    public Result handleQuery(String query){
        ClusterRepository clusterRepository = new ClusterRepository();
        GraphQLSchema graphQLSchema =  SchemaParser.newParser()
                                                    .file("schema.graphqls")
                                                    .resolvers(new Query(clusterRepository))
                                                    .build()
                                                    .makeExecutableSchema();

        GraphQL build = GraphQL.newGraphQL(graphQLSchema).build();
        ExecutionResult executionResult = build.execute(query);

        return  ok(Json.toJson(executionResult.toSpecification()));

    }

}
