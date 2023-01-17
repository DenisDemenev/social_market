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
import { useClipboard } from 'use-clipboard-copy';

const GroupCardVk = ({ group }) => {
  const clipboard = useClipboard();

  return (
    <>
      <Card
        raised
        sx={{
          borderRadius: 3,
          display: { xs: 'none', sm: 'flex' },
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
            <a
              href={group.link}
              style={{ textDecoration: 'none' }}
              target="_blank"
              rel="noreferrer">
              <Typography
                sx={[
                  { fontSize: '14px', lineHeight: 1.2 },
                  () => (group.label ? { color: 'black' } : { color: 'gray' }),
                ]}
                component="div">
                {group.name}
              </Typography>
            </a>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '12px', lineHeight: 1, mt: 0.5 }}>
              {group.subscribes.toLocaleString('ru')}{' '}
              {num_word(group.subscribes)}
            </Typography>
          </Box>
          <Box sx={{ alignSelf: 'center' }}>
            <Tooltip title="Скопировать ссылку">
              <IconButton onClick={() => clipboard.copy(group.link)}>
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
          <Box sx={{ alignSelf: 'center', ml: 0.5 }}>
            <Typography
              component="div"
              color="text.secondary"
              sx={{ fontSize: '12px', lineHeight: 1 }}>
              CPM
            </Typography>
            <Tooltip title="CPM">
              <Typography
                variant="body2"
                sx={{
                  fontSize: '14px',
                  lineHeight: 1,
                  mt: 1,
                  fontWeight: 500,
                }}>
                {group.cpm}
              </Typography>
            </Tooltip>
          </Box>

          <Box
            sx={{
              alignSelf: 'center',
              width: { sm: '80px' },
              textAlign: 'start',
              ml: 0.5,
            }}>
            {group.subject.map((subject) => (
              <Typography
                variant="body2"
                color="text.secondary"
                key={subject.id}>
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

      <Card
        raised
        sx={{
          borderRadius: 3,
          display: { xs: 'flex', sm: 'none' },
          p: 1,
          flexDirection: 'row',
          mb: 2,
          justifyContent: 'space-between',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <CardMedia
            component="img"
            width="100"
            height="100"
            alt={group.name}
            src={group.avatar}
            sx={{
              borderRadius: 50,
              width: 100,
              height: 100,
              mb: 1.5,
              mx: 'auto',
            }}
          />
          <Typography
            component="div"
            sx={{ fontSize: '18px', lineHeight: 1.2, fontWeight: 700 }}>
            {group.price.toLocaleString('ru')} руб.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Box>
            <a
              href={group.link}
              style={{ textDecoration: 'none' }}
              target="_blank"
              rel="noreferrer">
              <Typography
                sx={[
                  { fontSize: '14px', lineHeight: 1.2, fontWeight: 600 },
                  () => (group.label ? { color: 'black' } : { color: 'gray' }),
                ]}
                component="div">
                {group.name}
              </Typography>
            </a>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: '12px', lineHeight: 1, mt: 0.5 }}>
              {group.subscribes.toLocaleString('ru')}{' '}
              {num_word(group.subscribes)}
            </Typography>
          </Box>
          <Box sx={{ alignSelf: 'center' }}>
            <Tooltip title="Скопировать ссылку">
              <IconButton onClick={() => clipboard.copy(group.link)}>
                <ContentCopyIcon color="primary" fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Посмотреть статистику">
              <IconButton>
                <a href={group.stats} target="_blank" rel="noreferrer">
                  <SignalCellularAltIcon color="primary" fontSize="large" />
                </a>
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Typography variant="body2">
              Охват: {group.coverage.toLocaleString('ru')}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">CPM: {group.cpm}</Typography>
          </Box>
          <Box
            sx={{
              alignSelf: 'center',
              textAlign: 'center',
            }}>
            {group.subject.map((subject) => (
              <Typography
                variant="body2"
                color="text.secondary"
                key={subject.id}>
                {subject.name}
              </Typography>
            ))}
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default GroupCardVk;
