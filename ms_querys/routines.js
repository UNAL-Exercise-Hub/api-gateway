import axios from "axios";
import "dotenv/config";
import { auth_decorator } from "../support/authDecorator.js";

export const routines_func_querys = `
  routineUserDay(ID: ID!, DAY: String!): Exerciseday
  routineUser(ID: ID!): Routine
`;

export const routines_func_mutations = `
  addRoutine(
    usuario_id: ID!
    dias_semana: [ExercisedayInput]
  ): Routine

  updateRoutine(
    ID: ID!
    DAY: String
    ejercicios: [Int]
    Hora_inicio: String
    Duracion_Max: Int
  ): Routine

  deleteRoutine(ID: ID!): Routine
`;

export const routines_squemas = `
  type Routine {
    promedio: Float,
    _id: ID
    usuario_id: ID
    dias_semana: [Exerciseday]
  }

  type Exerciseday {
    _id: ID
    dia: String
    ejercicios: [Int]
    Duracion_Max: Int
    Hora_inicio: String
  }

  input ExercisedayInput {
    dia: String
    ejercicios: [Int]
    Duracion_Max: Int
    Hora_inicio: String
  }
`;

export const routines_querys = {
  routineUserDay: async (_, { ID, DAY, token }) => {
    await auth_decorator(token);
    const result = await axios.get(
      `http://${process.env.NAME_ROUTINES}:${process.env.PORT_ROUTINES}/api/User/${ID}/${DAY}`
    );
    return result.data;
  },
  routineUser: async (_, { ID, token }) => {
    await auth_decorator(token);
    const result = await axios.get(
      `http://${process.env.NAME_ROUTINES}:${process.env.PORT_ROUTINES}/api/User/${ID}`
    );
    return result.data;
  },
};

export const routines_mutations = {
  addRoutine: async (_, args) => {
    const result = await axios.post(
      `http://${process.env.NAME_ROUTINES}:${process.env.PORT_ROUTINES}/api`,
      args
    );
    return result.data;
  },
  updateRoutine: async(_, args) => {
    const result = await axios.patch(
      `http://${process.env.NAME_ROUTINES}:${process.env.PORT_ROUTINES}/api/User/${args.ID}/${args.DAY}`,
      args
    );
    return result.data;
  },
  deleteRoutine: async(_, { ID }) => {
    const result = await axios.delete(
      `http://${process.env.NAME_ROUTINES}:${process.env.PORT_ROUTINES}/api/User/${ID}`
    );
    return result.data;
  }
};
