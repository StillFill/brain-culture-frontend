import axios from "axios";
import environments from "../Environments/Environments.local";

export const getFazendasQuantity = async () => {
  try {
    const res = await axios.get(environments.produtores_uri + "/quantidade");
    return res.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Erro ao buscar quantidade de fazendas");
  }
};

export const getHectaresFazendas = async () => {
  try {
    const res = await axios.get(environments.produtores_uri + "/area-total");
    return res.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Erro ao buscar quantidade de fazendas");
  }
};

export const getGraphByEstado = async (): Promise<GraphByEstado[]> => {
  try {
    const res = await axios.get<GraphByEstado[]>(
      environments.produtores_uri + "/graph-by-estado"
    );
    return res.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Erro ao buscar quantidade de fazendas");
  }
};

export const getGraphByCultura = async (): Promise<GraphByEstado[]> => {
  try {
    const res = await axios.get<GraphByEstado[]>(
      environments.produtores_uri + "/graph-cultura"
    );
    return res.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Erro ao buscar quantidade de fazendas");
  }
};

export const getGraphBySolo = async (): Promise<GraphByEstado[]> => {
  try {
    const res = await axios.get<GraphByEstado[]>(
      environments.produtores_uri + "/graph-by-uso-solo"
    );
    return res.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Erro ao buscar quantidade de fazendas");
  }
};

export interface GraphByEstado {
  estado: string;
  quantity: number;
  percentage: number;
}
