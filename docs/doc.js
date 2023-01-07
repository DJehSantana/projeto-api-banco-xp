export const swaggerDocument = {
    "swagger": "2.0",
    "info": {
        "description": "Meu Banco NodeJS",
        "version": "1.0.0",
        "title": "API Banco NodeJs"
    },
    "host": "localhost:3000",
    "tags": [
        {
            "name": "account",
            "description": "Account management"
        }
    ],
    "paths": {
        "/account": {
            "get": {
                "tags": [
                    "account"
                ],
                "summary": "Get existing accounts",
                "description": "Get existing account description",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "successful generation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Account"
                            }
                        }
                    },
                    "400": {
                        "description": "Error generate"
                    }
                }
            },
            "post": {
                "tags": [
                    "account"
                ],
                "summary": "create a new account",
                "description": "create a new account with the received parameters",
                "consumes": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Account object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Account"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "account created"
                    },
                    "400": {
                        "description": "error generate"
                    }
                }
            }
        }
    },
    "definitions": {
        "Account": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "example": "Tiago Silva"
                },
                "balance": {
                    "type": "number",
                    "example": 123.56
                }
            }
        }
    }
}