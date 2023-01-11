import { GraphQLInt, GraphQLList } from 'graphql';
import { listAccountById, listAllAccounts } from '../../services/account.service.js';
import { Account } from '../types/Account.js';
import { AccountInput } from '../types/AccountInput.js';

const accountQueries = {
    getAllAccounts: {
        type: new GraphQLList(Account),
        resolve: listAllAccounts
    },
    getAccount: {
        type: Account,
        args: {
            id: {
                name: "id",
                type: GraphQLInt
            }
        },
        resolve: (_, args) => listAccountById(args.id)
    }
}

export { accountQueries }