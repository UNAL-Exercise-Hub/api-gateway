import axios from "axios";
import "dotenv/config";
import { auth_decorator } from "../support/authDecorator.js";
import { soap } from "../support/xmlgetter.js";

export const videos_func_querys = `
  allvideos: [Video]
  videoByID(ID: ID!, token: String!): Video
  allmuscles(token: String!): [Musculo]
  allgroups: [GrupoMuscular]
  allobjectives: [Objetivo]
  allequipments: [Equipamento]
  alldisciplines: [Disciplina]
  alldifficulties: [Dificultad]
`;

export const videos_func_mutations = `
  addVideo(
    Titulo: String
    Link: String
    Imagen: String
    Duracion: Int
    Series: Int
    Musculos: [Int]
    Grupo: [Int]
    Objetivo: [Int]
    Dificultad: [Int]
    Equipamento: [Int]
    Disciplina: [Int]
  ): Message

  updateVideo(
    ID: ID!
    Titulo: String
    Link: String
    Imagen: String
    Duracion: Int
    Series: Int
    Musculos: [Int]
    Grupo: [Int]
    Objetivo: [Int]
    Dificultad: [Int]
    Equipamento: [Int]
    Disciplina: [Int]
  ): Video

  deleteVideo(ID: ID!): Message
`;

export const videos_squemas = `
  type Message {
    message: String
  }

  type Video {
    ID: ID!
    Titulo: String
    Link: String
    Imagen: String
    Duracion: Int
    Series: Int
    Musculos: [Musculo]
    Grupo: [GrupoMuscular]
    Objetivo: [Objetivo]
    Dificultad: [Dificultad]
    Equipamento: [Equipamento]
    Disciplina: [Disciplina]
  }

  type Musculo {
    ID: ID!
    Nombre: String
    Descripcion: String
    Videos: [Video]
  }

  type GrupoMuscular {
    ID: ID!
    Nombre: String
    Descripcion: String
    Videos: [Video]
  }

  type Objetivo {
    ID: ID!
    Nombre: String
    Descripcion: String
    Videos: [Video]
  }

  type Equipamento {
    ID: ID!
    Nombre: String
    Descripcion: String
    Videos: [Video]
  }

  type Disciplina {
    ID: ID!
    Nombre: String
    Descripcion: String
    Videos: [Video]
  }

  type Dificultad {
    ID: ID!
    Nombre: String
    Descripcion: String
    Videos: [Video]
  }
`;

export const videos_querys = {
  allvideos: async (_, { token }) => {
    const prefix = await soap().then((result) => {
      return result;
    }). catch((error) => {
      console.log(error);
    });
    console.log(prefix)

    await auth_decorator(token);
    console.log(`http://${process.env.NAME_VIDEOS}:${process.env.PORT_VIDEOS}/videos`);
    const result = await axios.get(
      `http://${process.env.NAME_VIDEOS}:${process.env.PORT_VIDEOS}/videos`
    );
    return result.data.videos;
  },
  videoByID: async (_, { ID, token }) => {
    await auth_decorator(token);
    const result = await axios.get(
      `http://${process.env.NAME_VIDEOS}:${process.env.PORT_VIDEOS}/videos/${ID}`
    );
    return result.data.videos;
  },
  allmuscles: async (_, { token }) => {
    await auth_decorator(token);
    const result = await axios.get(
      `http://${process.env.NAME_VIDEOS}:${process.env.PORT_VIDEOS}/categoria/musculos`
    );
    return result.data.musculos;
  },
  allgroups: async (_, { token }) => {
    await auth_decorator(token);
    const result = await axios.get(
      `http://${process.env.NAME_VIDEOS}:${process.env.PORT_VIDEOS}/categoria/grupoMuscular`
    );
    return result.data.grupos;
  },
  allobjectives: async (_, { token }) => {
    await auth_decorator(token);
    const result = await axios.get(
      `http://${process.env.NAME_VIDEOS}:${process.env.PORT_VIDEOS}/categoria/objetivo`
    );
    return result.data.objetivos;
  },
  alldifficulties: async (_, { token }) => {
    await auth_decorator(token);
    const result = await axios.get(
      `http://${process.env.NAME_VIDEOS}:${process.env.PORT_VIDEOS}/categoria/dificultad`
    );
    return result.data.dificultades;
  },
  allequipments: async (_, { token }) => {
    await auth_decorator(token);
    const result = await axios.get(
      `http://${process.env.NAME_VIDEOS}:${process.env.PORT_VIDEOS}/categoria/equipamento`
    );
    return result.data.equipamentos;
  },
  alldisciplines: async (_, { token }) => {
    await auth_decorator(token);
    const result = await axios.get(
      `http://${process.env.NAME_VIDEOS}:${process.env.PORT_VIDEOS}/categoria/disciplina`
    );
    return result.data.disciplina;
  },
};

export const videos_mutations = {
  addVideo: async (_, args) => {
    console.log(args);
    const result = await axios.post(
      `http://${process.env.NAME_VIDEOS}:${process.env.PORT_VIDEOS}/videos`,
      args
    );
    return result.data;
  },
  updateVideo: async (_, args) => {
    const result = await axios.put(
      `http://${process.env.NAME_VIDEOS}:${process.env.PORT_VIDEOS}/videos/${args.ID}`,
      args
    );
    return result.data.videos;
  },
  deleteVideo: async (_, { ID }) => {
    const result = await axios.delete(
      `http://${process.env.NAME_VIDEOS}:${process.env.PORT_VIDEOS}/videos/${ID}`
    );
    return result.data;
  },
};
