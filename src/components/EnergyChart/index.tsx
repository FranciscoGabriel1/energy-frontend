import React from "react";
import ReactApexChart from "react-apexcharts";
import { Invoice } from "../../models/Invoices";

interface EnergyChartProps {
  data: Invoice[];
  type: "energy" | "money";
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

  const months = data.map((invoice) => invoice.referenceMonth);

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      categories: months,
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
      colors: ["#024226"],
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      y: {
        formatter: function (value: any) {
          return isEnergy ? `${value} kWh` : `R$ ${value}`;
        },
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        const invoice = data[dataPointIndex];
        const date = new Date(invoice.createdAt).toLocaleDateString("pt-BR");
        return `<div class="apexcharts-tooltip-title" style="font-size: 14px;">${
          months[dataPointIndex]
        }</div>
                <div style="font-size: 12px;">${
                  isEnergy ? "Energia Consumida: " : "Valor Total: "
                }R$ ${series[seriesIndex][dataPointIndex]}</div>
                <div style="font-size: 12px;">Cliente: ${
                  invoice.customerNumber
                }</div>
                <div style="font-size: 12px;">Atualizada em: ${date}</div>`;
      },
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
