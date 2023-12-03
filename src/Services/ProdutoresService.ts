import axios from "axios";
import environments from "../Environments/Environments.local";
import { ICultura } from "./CulturasService";
import { IProdutorForm } from "../Pages/Management/ProdutorForm/ProdutorForm";

export const getProdutores = async (): Promise<IProdutor[]> => {
  try {
    const res = await axios.get<IProdutor[]>(environments.produtores_uri + "/");
    return res.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Erro ao buscar produtores");
  }
};

export const addProdutor = async ({
  documento,
  culturas_selection,
  ...produtor
}: IProdutorForm): Promise<void> => {
  try {
    await axios.post<IProdutor>(environments.produtores_uri, {
      ...produtor,
      documento_produtor: documento,
      culturas: culturas_selection.map((a) => a.value),
    });
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Erro ao adicionar produtor");
  }
};

export const updateProdutor = async ({
  documento,
  culturas_selection,
  ...produtor
}: IProdutorForm): Promise<void> => {
  try {
    await axios.put<IProdutor>(environments.produtores_uri, {
      ...produtor,
      documento_produtor: documento,
      culturas: culturas_selection.map((a) => a.value),
    });
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Erro ao atualizar produtor");
  }
};

export const deleteProdutor = async (documento: string) => {
  try {
    return axios.delete<IProdutor>(
      environments.produtores_uri + "/" + documento
    );
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Erro ao deletar produtor");
  }
};

export interface IProdutor {
  documento: string;
  nome: string;
  nome_fazenda: string;
  cidade: string;
  estado: string;
  area_total_fazenda: number;
  area_agricultavel_fazenda: number;
  area_vegetacao_fazenda: number;
  culturas: ICultura[];
}
