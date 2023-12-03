import { useEffect, useState } from "react";
import InfoCard from "./Components/InfoCard/InfoCard";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import "./Dashboard.scss";
import {
  getFazendasQuantity,
  getGraphByCultura,
  getGraphByEstado,
  getGraphBySolo,
  getHectaresFazendas,
} from "../../Services/DashboardService";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const formatToChatData = (graphData: any[], nameKey: string): IGraph[] => {
  const totalAmount = graphData.reduce((a, b) => a + b.percentage, 0);

  if (totalAmount === 0) return [];

  return graphData.map((g) => ({
    name: g[nameKey],
    value: g.percentage,
  }));
};

const renderLabel = function (entry: any) {
  return `${entry.value}% (${entry.name})`;
};

const Dashboard = () => {
  const [totalFazendas, setTotalFazendas] = useState();
  const [totalHectaresFazenda, setTotalHectaresFazenda] = useState();
  const [graphEstado, setGraphEstado] = useState<IGraph[]>();
  const [graphCultura, setGraphCultura] = useState<IGraph[]>();
  const [graphSolo, setGraphSolo] = useState<IGraph[]>();

  useEffect(() => {
    const loadFazendas = async () => {
      setTotalFazendas(await getFazendasQuantity());
      setTotalHectaresFazenda(await getHectaresFazendas());
      setGraphEstado(formatToChatData(await getGraphByEstado(), "estado"));
      setGraphCultura(
        formatToChatData(await getGraphByCultura(), "nome_cultura")
      );
      setGraphSolo(formatToChatData(await getGraphBySolo(), "area"));
    };

    loadFazendas();
  }, []);

  return (
    <div className="dashboard">
      <h1 id="dashboard">Dashboard</h1>
      <div className="big-numbers-header">
        <InfoCard
          title="Quantidade total de fazendas"
          loading={totalFazendas === undefined}
        >
          <div>
            <h3>{totalFazendas || 0}</h3>
          </div>
        </InfoCard>

        <InfoCard
          title="Hectares total de fazendas"
          loading={totalHectaresFazenda === undefined}
        >
          <div>
            <h3>{totalHectaresFazenda || 0}</h3>
          </div>
        </InfoCard>
      </div>

      <div className="graph-container">
        <InfoCard title="Fazendas por estado" loading={!graphEstado}>
          {graphEstado && graphEstado.length > 0 && (
            <ResponsiveContainer height={300} width="100%">
              <PieChart>
                <Pie data={graphEstado} dataKey="value" label={renderLabel}>
                  {graphEstado?.map((_, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}

          {graphEstado?.length === 0 && (
            <h3 className="no-info-message">Ainda não tem informações</h3>
          )}
        </InfoCard>

        <InfoCard title="Culturas" loading={!graphCultura}>
          {graphCultura && graphCultura.length > 0 && (
            <ResponsiveContainer height={300} width="100%">
              <PieChart>
                <Pie data={graphCultura} dataKey="value" label={renderLabel}>
                  {graphEstado?.map((_, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
          {graphCultura?.length === 0 && (
            <h3 className="no-info-message">Ainda não tem informações</h3>
          )}
        </InfoCard>

        <InfoCard title="Uso de solo" loading={!graphSolo}>
          {graphSolo && graphSolo.length > 0 && (
            <ResponsiveContainer height={300} width="100%">
              <PieChart>
                <Pie data={graphSolo} dataKey="value" label={renderLabel}>
                  {graphEstado?.map((_, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}

          {graphSolo && graphSolo.length === 0 && (
            <h3 className="no-info-message">Ainda não tem informações</h3>
          )}
        </InfoCard>
      </div>
    </div>
  );
};

interface IGraph {
  name: string;
  value: any;
}

export default Dashboard;
