import { useCallback, useEffect, useMemo, useState } from "react";
import "./index.scss";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  IProdutor,
  addProdutor,
  deleteProdutor,
  getProdutores,
  updateProdutor,
} from "../../Services/ProdutoresService";
import Modal from "react-bootstrap/Modal";
import ProdutorForm, { IProdutorForm } from "./ProdutorForm/ProdutorForm";
import "../../Components/styleButtons.scss";

const Management = () => {
  const [produtores, setProdutores] = useState<IProdutor[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedProdutor, setSelectedProdutor] = useState<IProdutor | null>(
    null
  );

  const renderCell = (cell: any, prodt: IProdutor[]) => {
    const value = cell.getValue();

    const produtorToEdit = prodt.find((a) => a.documento === value);

    if (!produtorToEdit) return null;

    return (
      <button
        className="blue-button"
        onClick={() => setSelectedProdutor(produtorToEdit)}
      >
        Ver detalhes
      </button>
    );
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "documento", //access nested data with dot notation
        header: "CPF/CNPJ",
      },
      {
        accessorKey: "nome",
        header: "Nome do produtor",
      },
      {
        accessorKey: "nome_fazenda", //normal accessorKey
        header: "Nome da fazenda",
      },
      {
        accessorKey: "cidade",
        header: "Cidade",
      },
      {
        accessorKey: "estado",
        header: "Estado",
      },
      {
        accessorKey: "area_total_fazenda",
        header: "Area total",
      },
      {
        accessorKey: "area_agricultavel_fazenda",
        header: "Area agricultável",
      },
      {
        accessorKey: "area_vegetacao_fazenda",
        header: "Area com vegetação",
      },
      {
        header: "Ações",
        accessorKey: "documento",
        Cell: ({ cell }: any) => renderCell(cell, produtores), //optional custom cell render
      },
    ],
    [produtores]
  );

  const loadProdutores = useCallback(async () => {
    setProdutores(await getProdutores());
  }, []);

  useEffect(() => {
    loadProdutores();
  }, []);

  const table = useMaterialReactTable({
    columns,
    data: produtores, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    defaultColumn: {
      minSize: 1, //allow columns to get smaller than default
      maxSize: 10, //allow columns to get larger than default
    },
  });

  const closeModal = useCallback(() => {
    setSelectedProdutor(null);
    setIsEditing(false);
  }, []);

  const submitForm = useCallback(
    async (produtor: IProdutorForm, isUpdate: boolean) => {
      const isEditingProdutor = isUpdate && !!selectedProdutor;

      if (isEditingProdutor) {
        await updateProdutor(produtor);
      } else {
        await addProdutor(produtor);
      }

      setSelectedProdutor(null);
      setIsEditing(false);

      loadProdutores();
    },
    [isEditing, selectedProdutor]
  );

  const deleteSelectedProdutor = useCallback(async () => {
    if (!selectedProdutor) return;

    await deleteProdutor(selectedProdutor.documento);

    setSelectedProdutor(null);
    setIsEditing(false);

    loadProdutores();
  }, [selectedProdutor]);

  return (
    <>
      <div className="management">
        <h1>Gerenciamento</h1>
        <div className="management-headers-button">
          <button
            id="new-produtor-form"
            className="green-button"
            onClick={() => setIsEditing(true)}
          >
            Adicionar produtor
          </button>
        </div>
        <div className="management-table">
          <MaterialReactTable table={table} />
        </div>
      </div>

      <Modal
        show={!!selectedProdutor || isEditing}
        onClose={closeModal}
        onHide={closeModal}
        size="lg"
      >
        <Modal.Body>
          <h1>{isEditing}</h1>
          <ProdutorForm
            produtor={selectedProdutor || undefined}
            isEditing={isEditing}
            setIsEditing={(a) => {
              console.log("iseiing: ", a);
              setIsEditing(a);
            }}
            submitForm={submitForm}
            deleteProdutor={deleteSelectedProdutor}
          ></ProdutorForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Management;
