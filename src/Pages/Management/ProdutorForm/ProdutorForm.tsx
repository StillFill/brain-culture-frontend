import { useEffect, useState, useCallback } from "react";
import "./ProdutorForm.scss";
import { IProdutor } from "../../../Services/ProdutoresService";
import Form from "react-bootstrap/Form";
import "../../../Components/styleButtons.scss";
import ReactLoading from "react-loading";
import ReactSelect, { Options } from "react-select";
import { ICultura, getAllCulturas } from "../../../Services/CulturasService";
import { cpf, cnpj } from "cpf-cnpj-validator";

const buildDataToForm = (produtor: IProdutor): IProdutorForm => {
  const culturas = produtor.culturas || [];
  return {
    area_agricultavel_fazenda: produtor.area_agricultavel_fazenda,
    area_total_fazenda: produtor.area_total_fazenda,
    area_vegetacao_fazenda: produtor.area_vegetacao_fazenda,
    cidade: produtor.cidade,
    documento: produtor.documento,
    estado: produtor.estado,
    nome: produtor.nome,
    nome_fazenda: produtor.nome_fazenda,
    culturas: culturas,
    culturas_selection: culturas.map((a) => ({ label: a.nome, value: a.id })),
  };
};

const formatToOptions = (culturas: ICultura[]): any => {
  return culturas.map((cult) => ({
    label: cult.nome,
    value: cult.id,
  }));
};

const ProdutorForm = (props: IProdutorFormProps) => {
  const [produtorForm, setProdutorForm] = useState<IProdutorForm>({
    area_agricultavel_fazenda: 0,
    area_total_fazenda: 0,
    area_vegetacao_fazenda: 0,
    cidade: "",
    documento: "",
    estado: "",
    nome: "",
    nome_fazenda: "",
    culturas: [],
    culturas_selection: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [culturas, setCulturas] = useState([]);
  const [fieldErrors, setFieldErrors] = useState<FieldError>({});

  useEffect(() => {
    if (props.produtor) setProdutorForm(buildDataToForm(props.produtor));

    const loadData = async () => {
      const culturas = await getAllCulturas();

      setCulturas(formatToOptions(culturas));
    };

    loadData();
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

  const handleChangeMultiSelection = useCallback(
    (value: any, name: keyof IProdutorForm) => {
      const valueOfKey = produtorForm[name];

      if (!Array.isArray(valueOfKey)) return;

      setProdutorForm({
        ...produtorForm,
        [name]: value,
      });

      console.log(produtorForm);
    },
    [produtorForm]
  );

  const validateForm = (produtorForm: IProdutorForm) => {
    const fieldToValidate: ValidationForm = {
      documento: {
        validate: (produtorForm: IProdutorForm) =>
          cpf.isValid(produtorForm.documento) ||
          cnpj.isValid(produtorForm.documento),
        message: "Documento inválido",
      },
      area_total_fazenda: {
        validate: (produtorForm: IProdutorForm) =>
          produtorForm.area_agricultavel_fazenda +
            produtorForm.area_vegetacao_fazenda <=
          produtorForm.area_total_fazenda,
        message:
          "A area com vegetação e agricultável juntas está maior que a área total da fazenda",
      },
    };

    let fields: FieldError = {};

    Object.keys(fieldToValidate).map((a) => {
      const field = a as keyof ValidationForm;
      const i = fieldToValidate[field];

      if (!i) {
        return {
          errorMessage: "",
          field: "culturas_selection",
          isValid: false,
        };
      }

      fields[field] = {
        errorMessage: i.message,
        isValid: i.validate(produtorForm),
      };
    });

    setFieldErrors(fields);

    const invalidFields = (Object.keys(fields) as (keyof typeof fields)[]).find(
      (key) => {
        return !fields[key]?.isValid;
      }
    );

    return !invalidFields || invalidFields.length === 0;
  };

  const onSubmitForm = useCallback(async () => {
    try {
      if (!validateForm(produtorForm)) return;

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
            id="delete-button"
            className="red-button"
            onClick={() => props.deleteProdutor()}
          >
            Excluir
          </button>
        )}
        {!props.isEditing && (
          <button
            id="edit-button"
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
            maxLength={14}
          />
          {fieldErrors.documento && !fieldErrors.documento.isValid && (
            <p className="error-message">
              {fieldErrors.documento.errorMessage}
            </p>
          )}
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

          <div className="input-form-container">
            <Form.Label>Cultura</Form.Label>
            <ReactSelect
              isDisabled={!props.isEditing}
              // type="text"
              id="culturas_selection"
              name="culturas_selection"
              onChange={(evt) =>
                handleChangeMultiSelection(evt, "culturas_selection")
              }
              value={produtorForm.culturas_selection}
              options={culturas}
              isMulti
              placeholder="Selecione uma cultura"
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
            {fieldErrors.area_total_fazenda &&
              !fieldErrors.area_total_fazenda.isValid && (
                <p className="error-message">
                  {fieldErrors.area_total_fazenda.errorMessage}
                </p>
              )}
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
            id="submit-button"
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

interface IProdutorFormProps {
  produtor?: IProdutor;
  isEditing: boolean;
  setIsEditing: (value: boolean) => any;
  submitForm: (produtor: IProdutorForm, isUpdate: boolean) => Promise<void>;
  deleteProdutor: () => {};
}

type FieldError = {
  [key in keyof IProdutorForm]?: {
    isValid: boolean;
    errorMessage: string;
  };
};

type ValidationForm = {
  [key in keyof IProdutorForm]?: {
    validate: (produtorForm: IProdutorForm) => boolean;
    message: string;
  };
};

export interface IProdutorForm extends IProdutor {
  culturas_selection: { label: string; value: number }[];
}

export default ProdutorForm;
