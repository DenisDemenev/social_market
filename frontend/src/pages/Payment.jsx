import { Paper, Typography, Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";


const codeStr = `
  <div id="yandex_rtb_R-A-14187607-2"></div>
  <script>
  window.yaContextCb.push(() => {
    Ya.Context.AdvManager.render({
        "blockId": "R-A-14187607-2",
        "renderTo": "yandex_rtb_R-A-14187607-2"
    })
  })
  </script>
`


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
        <Box sx={{ padding: 5 }} dangerouslySetInnerHTML={{ __html: codeStr }} />
      </Paper>
    </Container>
  );
};

export default Payment;
