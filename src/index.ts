import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { __prod__ } from "./constants";
//import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";
import { buildSchema } from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";

const main = async () => {

    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getSchemaGenerator().updateSchema();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                HelloResolver
            ],
            validate: false
        })
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('server started on localhost 4000');
    })
}

//
main().catch(err => {
    console.error(err);
});
