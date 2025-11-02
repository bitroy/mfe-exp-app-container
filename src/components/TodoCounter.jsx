import React, { useState } from 'react';
import { Box, Paper, Typography, Chip, Badge } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useEventSubscription, EVENT_TYPES } from '@mfe/shared-eventbus';

export default function TodoCounter() {
  const [todoCount, setTodoCount] = useState(0);
  const [lastEvent, setLastEvent] = useState(null);
  const [eventAnimation, setEventAnimation] = useState(false);

  useEventSubscription(EVENT_TYPES.TODO_ADDED, (data) => {
    setTodoCount(prev => prev + 1);
    setLastEvent({ type: 'added', title: data.title });
    triggerAnimation();
  }, []);

  useEventSubscription(EVENT_TYPES.TODO_DELETED, (data) => {
    setTodoCount(prev => Math.max(0, prev - 1));
    setLastEvent({ type: 'deleted', title: data.title });
    triggerAnimation();
  }, []);

  const triggerAnimation = () => {
    setEventAnimation(true);
    setTimeout(() => setEventAnimation(false), 600);
  };

  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 2, 
        m: 2, 
        bgcolor: 'primary.dark',
        color: 'white',
        borderRadius: 2,
        transition: 'all 0.3s ease',
        transform: eventAnimation ? 'scale(1.05)' : 'scale(1)',
        boxShadow: eventAnimation ? '0 8px 16px rgba(0,0,0,0.3)' : '0 4px 8px rgba(0,0,0,0.2)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          📊 Todo Counter
        </Typography>
        <Badge 
          badgeContent={todoCount} 
          color="secondary"
          max={999}
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '1rem',
              height: '28px',
              minWidth: '28px',
              borderRadius: '14px'
            }
          }}
        >
          <Chip 
            label="Total" 
            size="small" 
            sx={{ bgcolor: 'white', color: 'primary.dark', fontWeight: 'bold' }}
          />
        </Badge>
      </Box>

      <Typography variant="body2" color="grey.300" sx={{ mb: 2 }}>
        Listening to events from Todo MFE
      </Typography>

      {lastEvent && (
        <Box 
          sx={{ 
            p: 1.5, 
            bgcolor: 'rgba(255,255,255,0.1)', 
            borderRadius: 1,
            border: '1px solid rgba(255,255,255,0.2)',
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            {lastEvent.type === 'added' ? (
              <CheckCircleOutlineIcon sx={{ color: 'success.light', fontSize: '1.2rem' }} />
            ) : (
              <DeleteOutlineIcon sx={{ color: 'error.light', fontSize: '1.2rem' }} />
            )}
            <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'white' }}>
              Event Received: {lastEvent.type === 'added' ? 'TODO_ADDED' : 'TODO_DELETED'}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: 'grey.400', fontStyle: 'italic' }}>
            "{lastEvent.title}"
          </Typography>
        </Box>
      )}

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Paper>
  );
}
