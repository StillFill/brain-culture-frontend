import { render, screen } from "@testing-library/react";
import InfoCard from "./InfoCard";

test("Valida renderização children", () => {
  render(
    <InfoCard title="" loading={false}>
      <h1>INFORMAÇÃO</h1>
    </InfoCard>
  );

  const element = screen.getByText(/INFORMAÇÃO/i);

  expect(element).toBeInTheDocument();
});

test("Valida renderização titulo", () => {
  render(
    <InfoCard title="Titulo" loading={false}>
      <h1>INFORMAÇÃO</h1>
    </InfoCard>
  );

  const element = screen.getByText(/Titulo/i);

  expect(element).toBeInTheDocument();
});

test("Valida loading", () => {
  render(
    <InfoCard title="Titulo" loading={true}>
      <h1>INFORMAÇÃO</h1>
    </InfoCard>
  );

  const element = screen.getByText(/Carregando.../i);

  expect(element).toBeInTheDocument();
});
