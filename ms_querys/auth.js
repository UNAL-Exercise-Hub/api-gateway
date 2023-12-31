import axios from "axios";
import "dotenv/config";

export const auth_func_querys = `
  authByID(UserId: ID!): Login
  token(email: String!, password: String!): TokenMessage
`;

export const auth_func_mutations = `
  addAuth(
    UserId: ID
    UserEmail: String
    UserPasswordHash: String
  ): Message

  updateAuth(
    UserId: ID!
    UserPasswordHash: String
  ): Message

  deleteAuth(UserId: ID!): Message
`;

export const auth_squemas = `
  type Message {
    message: String
  }

  type TokenMessage {
    token: String
    error: String
  }

  type Login {
    UserId: ID
    UserEmail: String
    UserPasswordHash: String
  }
`
;

export const auth_querys = {
    authByID: async (_, { UserId }) => {
      try{
        const result = await axios.get(
          `${process.env.PROTOCOL}://${process.env.NAME_AUTH}:${process.env.PORT_AUTH}/login/${UserId}`
          );
        return result.data;
      } catch (error) {
        return { "message": "El usuario no existe"};
      }
    },
    token: async (_, { email, password }) => {
      try{
        const result = await axios.post(
          `${process.env.PROTOCOL}://${process.env.NAME_AUTH}:${process.env.PORT_AUTH}/token`,
          {
            email: email,
            password: password,
          }
        );
        return result.data;
      } catch (error) {
        return { "error": "Error en el servidor"};
      }
    },
  };
  
  export const auth_mutations = {
    addAuth: async (_, args) => {
      try {
        await axios.post(
          `${process.env.PROTOCOL}://${process.env.NAME_AUTH}:${process.env.PORT_AUTH}/login/`,
        args
        );
        return { "message": "Usuario creado"};
      } catch (error) {
        return { "message": "El usuario ya existe"};
      }
    },
    updateAuth: async (_, args) => {
      try {
        const result = await axios.put(
          `${process.env.PROTOCOL}://${process.env.NAME_AUTH}:${process.env.PORT_AUTH}/login/${args.ID}`,
          args
        );
        return result.data.videos;
      } catch (error) {
        return { "message": "El usuario no existe"};
      }
    },
    deleteAuth: async (_, { ID }) => {
      try{
        const result = await axios.delete(
          `${process.env.PROTOCOL}://${process.env.NAME_AUTH}:${process.env.PORT_AUTH}/login/${ID}`
        );
        console.log(result.data)
        return result.data;
      } catch (error) {
        return { "message": "El usuario no existe"};
      }
    },
  };