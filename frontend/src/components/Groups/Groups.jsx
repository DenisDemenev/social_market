import React from 'react';
import { num_word } from '../../utils/numWord';
import {
  Tooltip,
  Card,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Groups = ({ group }) => {
  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
    } catch (err) {
      console.log('Ошибка копирования!');
    }
  };

  return (
    <Card
      raised
      sx={{
        borderRadius: 3,
        display: 'flex',
        p: 1,
        flexDirection: 'row',
        mb: 2,
        justifyContent: 'space-between',
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CardMedia
          component="img"
          width="70"
          height="70"
          alt={group.name}
          src={group.avatar}
          sx={{
            borderRadius: { xs: 50, sm: 50 },
            width: { xs: 100, sm: 70 },
            height: { xs: 100, sm: 70 },
            mb: { xs: 1.5, sm: 0 },
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Box
          sx={{
            alignSelf: 'center',
            ml: 2,
            textAlign: { xs: 'center', sm: 'start' },
            width: { sm: '150px' },
          }}>
          <Typography
            sx={[
              { fontSize: '14px', lineHeight: 1.2 },
              () => (group.label ? { color: 'black' } : { color: 'gray' }),
            ]}
            component="div">
            {group.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '12px', lineHeight: 1, mt: 0.5 }}>
            {group.subscribes.toLocaleString('ru')} {num_word(group.subscribes)}
          </Typography>
        </Box>
        <Box sx={{ alignSelf: 'center' }}>
          <Tooltip title="Скопировать ссылку">
            <IconButton onClick={() => copyToClipBoard(group.link)}>
              <ContentCopyIcon color="primary" fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ alignSelf: 'center' }}>
          <Tooltip title="Посмотреть статистику">
            <IconButton>
              <a href={group.stats} target="_blank" rel="noreferrer">
                <SignalCellularAltIcon color="primary" fontSize="large" />
              </a>
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ alignSelf: 'center', textAlign: 'center' }}>
          <Typography component="div">
            {group.price.toLocaleString('ru')} руб.
          </Typography>
          <Tooltip title="Охват">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Typography variant="body2" color="text.secondary">
                {group.coverage.toLocaleString('ru')}
              </Typography>
              <VisibilitySharpIcon
                color="primary"
                fontSize="inherit"
                sx={{ ml: 0.5 }}
              />
            </Box>
          </Tooltip>
        </Box>
        <Tooltip title="CPM">
          <Box sx={{ alignSelf: 'center', ml: 0.5 }}>
            <Typography component="div">{group.cpm}</Typography>
          </Box>
        </Tooltip>
        <Box
          sx={{
            alignSelf: 'center',
            width: { sm: '80px' },
            textAlign: 'start',
            ml: 0.5,
          }}>
          {group.subject.map((subject) => (
            <Typography variant="body2" color="text.secondary" key={subject.id}>
              {subject.name}
            </Typography>
          ))}
        </Box>
        <Tooltip title="Срок размещения: Топ/лента">
          <Box sx={{ alignSelf: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              1/24
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    </Card>
  );
};

export default Groups;
