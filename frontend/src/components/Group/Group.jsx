import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useParams } from 'react-router-dom';
import { FaRegEye } from 'react-icons/fa';
import { IoIosStats } from 'react-icons/io';
import { Container } from '@mui/system';
import { Button, Grid } from '@mui/material';

const Group = () => {
  const [group, setGroup] = useState({});
  const { id } = useParams();
  useEffect(() => {
    api
      .getGroup(id)
      .then((res) => {
        setGroup(res);
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid
        justifyContent="space-between"
        alignItems="center"
        container
        spacing={2}
        sx={{ height: 50 }}>
        <Grid item lg={2} xs={3}>
          <img src={group.avatar} />
        </Grid>
        <Grid lg={3} xs={7} item>
          <h3>{group.name}</h3>
          <p>{group.subscribes} подписчиков</p>
        </Grid>
        <Grid item lg={1} xs={1}>
          <Button>Copy</Button>
        </Grid>
        <Grid item lg={1}>
          <a href={group.stats} target="_blank" rel="noreferrer">
            <IoIosStats />
          </a>
        </Grid>
        <Grid item lg={2}>
          <h3>{group.price} руб.</h3>
          <p>
            {group.coverage}
            <span>
              <FaRegEye />
            </span>
          </p>
        </Grid>
        <Grid item lg={2}>
          <p>{group.cpm}</p>
        </Grid>
        {/* <div>
          {group.subject.map((subject) => (
            <span key={subject.id}>{subject.name}</span>
          ))}
        </div> */}
        <Grid item lg={1}>
          <p>1/24</p>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Group;
