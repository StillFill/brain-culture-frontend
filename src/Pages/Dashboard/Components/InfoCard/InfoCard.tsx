import { ReactNode } from "react";
import "./InfoCard.scss";
import ReactLoading from "react-loading";

const InfoCard = (props: InfoCardProps) => {
  if (props.loading) {
    return (
      <div className="info-card">
        <h2>Carregando...</h2>
        <ReactLoading
          color={"grey"}
          height={50}
          width={50}
          type="bars"
        ></ReactLoading>
        <br />
      </div>
    );
  }

  return (
    <div className="info-card">
      <h2>{props.title}</h2>
      {props.children}
    </div>
  );
};

export default InfoCard;

interface InfoCardProps {
  children: ReactNode;
  title: string;
  loading?: boolean;
}
