import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function DataTable({
  data,
}: {
  data: {
    email: string;
    purchaseDate: Date;
    price: bigint;
  }[];
}) {
  const formatDate = (purchaseDate: Date) => {
    const splitted = purchaseDate.toISOString().split("T");
    return `${splitted[0]} ${splitted[1].slice(0, 5)}`;
  };
  const formatPrice = (price: bigint) => {
    let formatted = Number(price) / 100;
    return formatted.toFixed(2).toString();
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
            <TableCell>Email</TableCell>
            <TableCell align="center">Data zakupu</TableCell>
            <TableCell align="center">Suma</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.email}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="center">
                {formatDate(row.purchaseDate)}
              </TableCell>
              <TableCell align="center">{formatPrice(row.price)} zł</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
