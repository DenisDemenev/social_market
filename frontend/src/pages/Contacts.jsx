import { Paper, Typography, Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const Contacts = () => {
  return (
    <Container maxWidth='xl'>
      <Paper elevation={6}>
        <Typography
          variant='h4'
          paddingTop={5}>
          Контакты
        </Typography>

        <Box sx={{ padding: 5 }}>
          {/* <Typography
            align='justify'
            paragraph
            variant='p'>
            Согласование рекламных материалов и времени размещения происходит до
            оплаты размещения.
          </Typography> */}
          <Typography
            align='justify'
            paragraph
            variant='p'>
            <ul>
              <li>
                <em> ИП Деменев Денис Владимирович</em>
              </li>
              <li>
                <em>
                  Юр. адрес: 620043 г.Екатеринбург, пос. Чусовское озеро,
                  ул.Зеленая, 45
                </em>
              </li>
              <li>
                <em> Телефон: +79956772697</em>
              </li>
              <li>
                <em> ИНН: 665812336008</em>
              </li>
              <li>
                <em> ОГРНИП: 323665800189356</em>
              </li>
              <li>
                <em> Расч. счет: 40802810400005220323</em>
              </li>
              <li>
                <em> Банк: АО "ТИНЬКОФФ БАНК"</em>
              </li>
              <li>
                <em> Кор. счет: 30101810145250000974</em>
              </li>
              <li>
                <em> БИК: 044525974</em>
              </li>
            </ul>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Contacts;
