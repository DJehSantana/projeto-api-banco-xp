import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { accountMutation } from './mutations/accoount.mutation.js';
import { accountQueries } from './queries/account.query.js';

const Schema = new GraphQLSchema({
    types: null,
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            ...accountQueries
        }
    }),
    mutation: new GraphQLObjectType({
        name: "RootMutation",
        fields: {
            ...accountMutation
        }
    })
});

export { Schema }