import axios from "axios";
import environments from "../Environments/Environments.local";

export const getAllCulturas = async (): Promise<ICultura[]> => {
  try {
    const res = await axios.get(environments.culturas_uri);
    return res.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Erro ao buscar lista de culturas");
  }
};

export interface ICultura {
  id: number;
  nome: string;
}
