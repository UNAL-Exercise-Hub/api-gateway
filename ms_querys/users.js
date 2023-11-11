import axios from "axios";
import "dotenv/config";

export const users_func_querys = `
  allusers: UserMessage
  userByEmail(email: String!): IdMessage
  loginUser(
    email: String
    password: String
  ): Message
`;

export const users_func_mutations = `
  addUser(
    nombres: String
    apellidos: String
    documento: String
    fecha_nacimiento: String
    sexo: String
    cel: String
    email: String
  ): Message

  registerUser(
    nombres: String
    apellidos: String
    fecha_nacimiento: String
    documento: String
    sexo: String
    cel: String
    email: String
    password: String
  ): Message 

  updateUser(
    id_usuario: ID!
    nombres: String
    apellidos: String
    documento: String
    fecha_nacimiento: String
    sexo: String
    cel: String
  ): Message

  deleteUser(ID: ID!): Message
`;

export const users_squemas = `
  type UserMessage {
    users: [User]  
  }
  type IdMessage {
    message: String
    id_usuario: String
  }
  type User {
    id_usuario: ID!
    nombres: String
    apellidos: String
    documento: String
    fecha_nacimiento: String
    sexo: String
    cel: Float
    email: String
  }
`;

export const users_querys = {
  allusers: async () => {
    const result = await axios.get(
      `http://${process.env.NAME_USERS}:${process.env.PORT_USERS}/user`
    );
    return result.data;
  },
  userByEmail: async (_, { email }) => {
    try {
      const result = await axios.get(
        `http://${process.env.NAME_USERS}:${process.env.PORT_USERS}/user/byEmail?email=${email}`
      );
      return result.data;
    } catch (error) {
      return { message: "Usuario no encontrado" };
    }
  },
  loginUser: async (_, args) => {
    const result = await axios.get(
      `http://${process.env.NAME_USERS}:${process.env.PORT_USERS}/user`
    );
    var id_user = null;
    for (let i = 0; i < result.data.length; i++) {
      if (result.data[i].email == args["email"]) {
        id_user = result.data[i].id_usuario;
      }
    }
    const result_2 = await axios.get(
      `http://${process.env.NAME_AUTH}:${process.env.PORT_AUTH}/login/${id_user}`
    );
    return { message: "Usuario logeado correctamente" };
  },
};

export const users_mutations = {
  addUser: async (_, args) => {
    args["cel"] = parseFloat(args["cel"]);
    const result = await axios.post(
      `http://${process.env.NAME_USERS}:${process.env.PORT_USERS}/user`,
      args
    );
    return result.data;
  },
  registerUser: async (_, args) => {
    try{
      await axios.post(
        `http://${process.env.NAME_AUTH}:${process.env.PORT_AUTH}/login/`,
        {
          UserEmail: args["email"],
          UserPasswordHash: args["password"],
        }
      );
    } catch (error) {
      if (error.response.status == 400) {
        return { message: "El usuario ya existe" };
      }
      return { message: "Error en Auth:" + error.message };
    }
    try {
      args["cel"] = parseFloat(args["cel"]);
      await axios.post(
        `http://${process.env.NAME_USERS}:${process.env.PORT_USERS}/user`,
        args
      );
      return { message: "Usuario registrado correctamente" };
    } catch (error) {
      return { message: "Error en Users:" + error.message };
    }
  },
  updateUser: async (_, args) => {
    try {
      args["cel"] = parseFloat(args["cel"]);
      const result = await axios.put(
        `http://${process.env.NAME_USERS}:${process.env.PORT_USERS}/user/${args["id_usuario"]}`,
        args
      );
      return result.data;
    } catch (error) {
      return { message: "Error al actualizar el usuario" };
    }
  },
  deleteUser: async (_, { ID }) => {
    try{
    const result = await axios.delete(
      `http://${process.env.NAME_USERS}:${process.env.PORT_USERS}/user/${ID}`
    );
    return result.data;
    } catch (error) {
      return { message: "Error al eliminar el usuario" };
    }
  },
};
