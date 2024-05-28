// Arquivo: src/components/EnergyChart.tsx

import React from "react";
import ReactApexChart from "react-apexcharts";
import { Invoice } from "../../models/Invoices";

interface EnergyChartProps {
  data: Invoice[];
  type: "energy" | "money"; // Adicionar propriedade para diferenciar o tipo de gráfico
}

const EnergyChart: React.FC<EnergyChartProps> = ({ data, type }) => {
  const isEnergy = type === "energy";
  const series = [
    {
      name: isEnergy ? "Energia Elétrica (kWh)" : "Valores Monetários (R$)",
      data: data.map((invoice) =>
        parseFloat(
          isEnergy
            ? invoice.electricEnergyKWh.replace(",", ".")
            : invoice.electricEnergyValue.replace(",", ".")
        )
      ),
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: data.map((invoice) => invoice.referenceMonth),
      labels: {
        rotate: -45,
        rotateAlways: true,
      },
    },
    yaxis: {
      title: {
        text: isEnergy ? "kWh" : "R$",
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    fill: {
      colors: ["#0f4c81"],
    },
    title: {
      text: isEnergy ? "Consumo de Energia Elétrica" : "Gastos Monetários",
      align: "center",
      style: {
        fontSize: "16px",
        color: "#ffffff",
      },
    },
  };
  //@ts-ignore
  return <ReactApexChart options={options} series={series} type="bar" />;
};

export default EnergyChart;
