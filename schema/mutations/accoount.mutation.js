import { GraphQLBoolean, GraphQLInt } from 'graphql';
import { destroyAccount, saveAccount, updateAccountProperties } from "../../services/account.service.js"
import { Account } from "../types/Account.js"
import { AccountInput } from "../types/AccountInput.js"


const accountMutation = {
    createAccount: {
        type: Account,
        args: {
            account: {
                name: "account",
                type: AccountInput
            }
        },
        resolve(_, args) {
            return saveAccount(args.account);
        }
    },
    deleteAccount: {
        type: GraphQLBoolean,
        args: {
            id: {
                name: "id",
                type: GraphQLInt
            }
        },
        resolve(_, args) {
            destroyAccount(args.id)
        }
    },
    updateAccount: {
        type: Account,
        args: {
            account: {
                name: "account",
                type: AccountInput
            }
        },
        resolve(_, args) {
            return updateAccountProperties(args.account);
        }
    }
}

export { accountMutation }