import { Paper, Typography, Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const Payment = () => {
  return (
    <Container maxWidth='xl'>
      <Paper elevation={6}>
        <Typography
          variant='h4'
          paddingTop={5}>
          Способы оплаты
        </Typography>

        <Box sx={{ padding: 5 }}>
          <Typography
            align='justify'
            paragraph
            variant='p'>
            Согласование рекламных материалов и времени размещения происходит до
            оплаты размещения.
          </Typography>
          <Typography
            align='justify'
            paragraph
            variant='p'>
            <strong>Для физических лиц:</strong>
            <ul>
              <li>
                <em>Оплата по счету</em>
              </li>
              <li>
                <em>Картой</em>
              </li>
              <li>
                <em>QR код</em>
              </li>
            </ul>
          </Typography>
          <Typography
            align='justify'
            paragraph
            variant='p'>
            <strong>Для юридических лиц:</strong>
            <ul>
              <li>
                <em>Оплата на расчетный счет</em>
              </li>
            </ul>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Payment;
