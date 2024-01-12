import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";

export default function DataTable({
  data,
  columns,
  clickable,
}: {
  columns: String[];
  data: Array<{}>;
  clickable?: Boolean;
}) {
  const removeFieldsStartingWithUnderscore = (arr: Array<{}>) => {
    return arr.map((obj) => {
      const newObj = {};

      for (const key in obj) {
        if (!key.startsWith("_")) {
          newObj[key] = obj[key];
        }
      }

      return newObj;
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 650,
          "& .MuiTableCell-root": {
            fontFamily: "revert",
          },
          "& .MuiTableCell-head": {
            fontWeight: 600,
            color: "#602c5d",
          },
          "& .MuiTableCell": {},
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            {columns.map((col, idx) => {
              return <TableCell key={idx}>{col}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {removeFieldsStartingWithUnderscore(data).map((row, idx) => (
            <TableRow
              key={idx}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {Object.values(row).map((item, colIdx) => {
                if (colIdx === 0 && clickable) {
                  return (
                    <TableCell key={colIdx} component="th" scope="row">
                      <Link href={`/dashboard/products/${data[idx]["_id"]}`}>
                        {item.toString()}
                      </Link>
                    </TableCell>
                  );
                }

                return (
                  <TableCell key={colIdx} component="th" scope="row">
                    {item.toString()}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
