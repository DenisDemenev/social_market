import React from "react";
import {
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Table,
  TableContainer,
  Container,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const BasketElement = ({ group, handleLike, handleDeleteLike }) => {
  const id = group.id;
  const isLike = group.is_favorited;
  return (
    <Container maxWidth='lg'>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 320 }}
          aria-label='spanning table'>
          <TableBody>
            <TableRow
              key={group.id}
              sx={{ display: "flex", justifyContent: "space-around" }}>
              <TableCell sx={{ width: "20%" }}>{group.name}</TableCell>
              <TableCell sx={{ width: "20%" }}>{group.link_screen}</TableCell>
              <TableCell sx={{ width: "20%" }}>{group.stats}</TableCell>
              <TableCell sx={{ width: "5%" }}>{group.price} руб.</TableCell>
              <TableCell sx={{ width: "5%" }}>{group.subscribes}</TableCell>
              <TableCell sx={{ width: "5%" }}>{group.cpm}</TableCell>
              <TableCell sx={{ width: "5%", alignSelf: "center" }}>
                <IconButton
                  onClick={(_) =>
                    isLike ? handleDeleteLike({ id }) : handleLike({ id })
                  }>
                  <CloseIcon
                    color={isLike ? "primary" : "inherit"}
                    fontSize='small'
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BasketElement;
