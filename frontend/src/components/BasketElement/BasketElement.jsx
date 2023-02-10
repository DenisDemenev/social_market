import React from 'react';
import { IconButton, TableRow, TableCell, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BasketElement = ({ group, handleDeleteCart, handleCart }) => {
  const id = group.id;
  const isShoppingCart = group.is_in_shopping_cart;
  return (
    <TableRow key={group.id}>
      <TableCell>
        <Avatar src={group.avatar} />
      </TableCell>
      <TableCell align="left">{group.name}</TableCell>
      <TableCell>
        <IconButton
          onClick={(_) =>
            isShoppingCart ? handleDeleteCart({ id }) : handleCart({ id })
          }>
          <CloseIcon sx={{ color: 'red' }} fontSize="small" />
        </IconButton>
      </TableCell>
      <TableCell align="right">{group.price}</TableCell>
    </TableRow>
  );
};

export default BasketElement;
