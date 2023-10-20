import axios from "axios";
import "dotenv/config";

export const users_func_querys = `
  allusers: [User]
  loginUser(
    email: String
    password: String
  ): Message
`;

export const users_func_mutations = `
  addUser(
    nombres: String
    apellidos: String
    fecha_nacimiento: String
    sexo: String
    cel: String
    email: String
  ): String

  registerUser(
    nombres: String
    apellidos: String
    fecha_nacimiento: String
    sexo: String
    cel: String
    email: String
    password: String
  ): Message 

`;

export const users_squemas = `
  type User {
    id_usuario: ID!
    nombres: String
    apellidos: String
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
  loginUser: async (_, args) => {
    const result = await axios.get(
      `http://${process.env.NAME_USERS}:${process.env.PORT_USERS}/user`
    );
    var id_user = null;
    for (let i = 0; i < result.data.length; i++) {
      if (result.data[i].email == args['email'] ) {
        id_user = result.data[i].id_usuario;
      }
    }
    const result_2 = await axios.get(
        `http://${process.env.NAME_AUTH}:${process.env.PORT_AUTH}/login/${id_user}`
        );
    return {message: "Usuario logeado correctamente"};
  }
};

export const users_mutations = {
  addUser: async (_, args) => {
    args['cel'] = parseFloat(args['cel']);
    const result = await axios.post(
      `http://${process.env.NAME_USERS}:${process.env.PORT_USERS}/user`,
      args
    );
    return result.data;
  },
  registerUser: async (_, args) => {
    args['cel'] = parseFloat(args['cel']);
    await axios.post(
      `http://${process.env.NAME_USERS}:${process.env.PORT_USERS}/user`,
      args
    );

    await axios.post(
          `http://${process.env.NAME_AUTH}:${process.env.PORT_AUTH}/login/`,
        {
          "UserEmail": args['email'],
          "UserPasswordHash": args['password']}
      );
    return {message: "Usuario registrado correctamente"};
  }  
};
