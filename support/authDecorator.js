import "dotenv/config";

import axios from "axios";
import { GraphQLError } from "graphql";

export const auth_decorator = async (token) => {
  try{
    await axios.get(
      `${process.env.PROTOCOL}://${process.env.NAME_AUTH}:${process.env.PORT_AUTH}/verifytoken`,
      {
        data: {
          token: token,
        },
      }
    );
  } catch (error) {
    if (error.response.status == 401) {
      throw new GraphQLError("No estas autorizado para realizar esta accion",
      {extensions: {code: "UNAUTHENTICATED"}});
    }
    // throw new GraphQLError("No estas autorizado para realizar esta accion",
    if (error.response.status == 500) {
      throw new GraphQLError("Error en el servidor de autenticacion",
      {extensions: {code: "SERVER_ERROR"}});  
    }
    throw new GraphQLError("Error en el servidor",
    {extensions: {code: "SERVER_ERROR"}});
  }
}