import { useEffect, useState, useCallback } from "react";
import "./ProdutorForm.scss";
import { IProdutor } from "../../../Services/ProdutoresService";
import Form from "react-bootstrap/Form";
import "../../../Components/styleButtons.scss";
import ReactLoading from "react-loading";

const buildDataToForm = (produtor: IProdutor) => ({
  area_agricultavel_fazenda: produtor.area_agricultavel_fazenda,
  area_total_fazenda: produtor.area_total_fazenda,
  area_vegetacao_fazenda: produtor.area_vegetacao_fazenda,
  cidade: produtor.cidade,
  documento: produtor.documento,
  estado: produtor.estado,
  nome: produtor.nome,
  nome_fazenda: produtor.nome_fazenda,
  culturas: produtor.culturas,
});

const ProdutorForm = (props: IProdutorForm) => {
  const [produtorForm, setProdutorForm] = useState<IProdutor>({
    area_agricultavel_fazenda: 0,
    area_total_fazenda: 0,
    area_vegetacao_fazenda: 0,
    cidade: "",
    documento: "",
    estado: "",
    nome: "",
    nome_fazenda: "",
    culturas: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.produtor) setProdutorForm(buildDataToForm(props.produtor));
  }, []);

  const handleChange = useCallback(
    (evt: any) => {
      const { name, value, type } = evt.target;

      setProdutorForm({
        ...produtorForm,
        [name]: type === "number" ? Number(value) : value,
      });
    },
    [produtorForm]
  );

  const onSubmitForm = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log(produtorForm);
      await props.submitForm(produtorForm, !!props.produtor);
    } catch (err) {
      console.error("Erro para salvar os dados do produtor");
    } finally {
      setIsLoading(false);
    }
  }, [produtorForm]);

  return (
    <div className="produtor-form">
      <div className="header-buttons">
        {!props.isEditing && (
          <button
            className="blue-button"
            onClick={() => props.setIsEditing(true)}
          >
            Editar
          </button>
        )}
      </div>
      <h3>Produtor</h3>
      <div className="produtor-form-inputs">
        <div className="input-form-container">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            disabled={!props.isEditing}
            type="text"
            id="nome"
            name="nome"
            onChange={handleChange}
            value={produtorForm.nome}
          />
        </div>

        <div className="input-form-container">
          <Form.Label>Documento</Form.Label>
          <Form.Control
            disabled={!props.isEditing}
            type="text"
            id="documento"
            name="documento"
            onChange={handleChange}
            value={produtorForm.documento}
          />
        </div>
      </div>

      <h3>Fazenda</h3>
      <div className="produtor-form-container">
        <div className="produtor-form-inputs">
          <div className="input-form-container">
            <Form.Label>Nome da fazenda</Form.Label>
            <Form.Control
              disabled={!props.isEditing}
              type="text"
              id="nome_fazenda"
              name="nome_fazenda"
              onChange={handleChange}
              value={produtorForm.nome_fazenda}
            />
          </div>
        </div>

        <div className="produtor-form-inputs">
          <div className="input-form-container">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              disabled={!props.isEditing}
              type="text"
              id="estado"
              name="estado"
              onChange={handleChange}
              value={produtorForm.estado}
            />
          </div>

          <div className="input-form-container">
            <Form.Label>Cidade</Form.Label>
            <Form.Control
              disabled={!props.isEditing}
              type="text"
              id="cidade"
              name="cidade"
              onChange={handleChange}
              value={produtorForm.cidade}
            />
          </div>
        </div>

        <div className="produtor-form-inputs">
          <div className="input-form-container">
            <Form.Label>Area total</Form.Label>
            <Form.Control
              disabled={!props.isEditing}
              type="number"
              id="area_total_fazenda"
              name="area_total_fazenda"
              onChange={handleChange}
              value={produtorForm.area_total_fazenda}
            />
          </div>

          <div className="input-form-container">
            <Form.Label>Area com vegetação</Form.Label>
            <Form.Control
              disabled={!props.isEditing}
              type="number"
              id="area_vegetacao_fazenda"
              name="area_vegetacao_fazenda"
              onChange={handleChange}
              value={produtorForm.area_vegetacao_fazenda}
            />
          </div>

          <div className="input-form-container">
            <Form.Label>Area agricultável</Form.Label>
            <Form.Control
              disabled={!props.isEditing}
              type="number"
              id="area_agricultavel_fazenda"
              name="area_agricultavel_fazenda"
              onChange={handleChange}
              value={produtorForm.area_agricultavel_fazenda}
            />
          </div>
        </div>
      </div>

      <div className="produtor-form-footer">
        {props.isEditing && !!props.produtor && (
          <button
            className="blue-button"
            onClick={() => props.setIsEditing(false)}
          >
            Cancelar edição
          </button>
        )}
        {props.isEditing && (
          <button
            className="green-button produtor-form-submit-button"
            onClick={onSubmitForm}
          >
            {isLoading ? (
              <ReactLoading type="bars" color="green" height={35} width={30} />
            ) : (
              "Salvar"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

interface IProdutorForm {
  produtor?: IProdutor;
  isEditing: boolean;
  setIsEditing: (value: boolean) => any;
  submitForm: (produtor: IProdutor, isUpdate: boolean) => Promise<void>;
}

export default ProdutorForm;
