import { Paper, Typography, Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const OrderVariant = () => {
  return (
    <Container maxWidth='xl'>
      <Paper elevation={6}>
        <Typography
          variant='h4'
          paddingTop={5}>
          Как заказать
        </Typography>

        <Box sx={{ padding: 5 }}>
          <Typography
            align='justify'
            paragraph
            variant='p'>
            <strong>С помощью менеджера:</strong>
            <p>
              Заказать размещение Ваших рекламных материалов можно через соц.
              сеть Вконтакте. Для этого напишите{" "}
              <a
                target='_blank'
                rel='noreferrer'
                href='https://vk.me/id773837067'
                style={{ color: "#447BBA" }}>
                нашему менеджеру
              </a>
              .
            </p>
            <p>
              Ваша реклама публикуется и находится в ленте на первом месте как
              минимум 1 час, затем сдвигается в ленте новостей по мере
              публикации других постов.Пост размещается на час в топе и 24 ч в
              ленте.
              <p>Возможно размещение без удаления, +50% к цене поста.</p>
            </p>
          </Typography>
          <Typography
            align='justify'
            paragraph
            variant='p'>
            <strong>Оформить заказ на сайте:</strong>
            <ul>
              <li>Перейдите на страницу авторизации</li>
              <Box sx={{ textAlign: "start" }}>
                <img
                  alt='step 1'
                  src='/static/images/step1.png'
                  style={{
                    marginTop: 10,
                    marginBottom: 30,
                    display: "inline-block",
                    maxWidth: "100%",
                  }}
                />
              </Box>
              <li>Авторизуйтейсь с помощью Вконтакте</li>
              <Box sx={{ textAlign: "start" }}>
                <img
                  alt='step 2'
                  src='/static/images/step2.png'
                  style={{
                    marginTop: 10,
                    marginBottom: 30,
                    display: "inline-block",
                    maxWidth: "100%",
                  }}
                />
              </Box>
              <li>Добавьте в корзину интересующие Вас площадки</li>
              <Box sx={{ textAlign: "start" }}>
                <img
                  alt='step 3'
                  src='/static/images/step3.png'
                  style={{
                    marginTop: 10,
                    marginBottom: 30,
                    display: "inline-block",
                    maxWidth: "100%",
                  }}
                />
              </Box>
              <li>Перейдите в корзину</li>
              <Box sx={{ textAlign: "start" }}>
                <img
                  alt='step 4'
                  src='/static/images/step4.png'
                  style={{
                    marginTop: 10,
                    marginBottom: 30,
                    display: "inline-block",
                    maxWidth: "100%",
                  }}
                />
              </Box>
              <li>Оформите заказ</li>
              <Box sx={{ textAlign: "start" }}>
                <img
                  alt='step 5'
                  src='/static/images/step5.png'
                  style={{
                    marginTop: 10,
                    marginBottom: 30,
                    display: "inline-block",
                    maxWidth: "100%",
                  }}
                />
              </Box>
            </ul>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderVariant;
