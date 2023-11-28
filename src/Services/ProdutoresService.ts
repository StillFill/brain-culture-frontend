import axios from "axios";
import environments from "../Environments/Environments.local";

export const getProdutores = async (): Promise<IProdutor[]> => {
  try {
    const res = await axios.get<IProdutor[]>(environments.produtores_uri + "/");
    return res.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Erro ao buscar quantidade de fazendas");
  }
};

export const getProdutorByDocumento = async (
  documento: string
): Promise<IProdutor> => {
  try {
    const res = await axios.get<IProdutor>(
      environments.produtores_uri + "/documento/" + documento
    );
    return res.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Erro ao buscar quantidade de fazendas");
  }
};

export const addProdutor = async ({
  documento,
  ...produtor
}: IProdutor): Promise<IProdutor> => {
  try {
    const res = await axios.post<IProdutor>(environments.produtores_uri, {
      ...produtor,
      documento_produtor: documento,
    });

    return res.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Erro ao buscar quantidade de fazendas");
  }
};

export const updateProdutor = async ({
  documento,
  ...produtor
}: IProdutor): Promise<IProdutor> => {
  try {
    console.log("PRODUTOOOOR:", produtor);
    const res = await axios.put<IProdutor>(environments.produtores_uri, {
      ...produtor,
      documento_produtor: documento,
    });

    return res.data;
  } catch (err: any) {
    console.error(err.message);
    throw new Error("Erro ao buscar quantidade de fazendas");
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
  culturas: string[];
}

export interface ICultura {
  id: string;
  nome: string;
}
