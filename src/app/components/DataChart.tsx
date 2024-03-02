"use client";
import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function DataChart({ data }: { data: {} }) {
  if (Object.keys(data).length === 0) {
    return;
  }

  return (
    <>
      <BarChart
        colors={["#602c5d"]}
        xAxis={[
          {
            id: "barCategories",
            data: Object.keys(data),
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: Object.values(data),
          },
        ]}
        sx={{
          "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
            fontFamily: "revert",
            fontWeight: "500",
            fill: "#602c5d",
          },
        }}
        tooltip={{ trigger: "item" }}
      />
    </>
  );
}
