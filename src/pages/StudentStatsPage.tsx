import { Box, Container, MenuItem, Paper, Select, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';
import { useStudentStats } from '@/shared/api/queries/useStudentStats.ts';

const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const StudentStatsPage = () => {
  const [month, setMonth] = useState('Май');
  const { mutate, data } = useStudentStats();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    mutate(month);
  }, [month]);

  const stats = data ?? {
    all_count_homework: 0,
    done_count_homework: 0,
    all_ball: 0,
    done_ball: 0,
    procent: 0,
    grade: 2,
  };

  return (
    <SidebarLayout>
      <Container maxWidth="md">
        {!isMobile && (
          <Typography variant="h4" gutterBottom sx={{ color: '#005343' }}>
            Статистика
          </Typography>
        )}

        <Paper
          sx={{
            p: 3,
            mt: 2,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            gap: 4,
            alignItems: isMobile ? 'center' : 'flex-start',
          }}
        >
          {/* Прогресс */}
          <Box flex={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Typography variant={'h5'} fontWeight="bold" sx={{ color: '#005343' }}>
                Прогресс за
              </Typography>
              <Select size="small" value={month} onChange={(e) => setMonth(e.target.value)}>
                {MONTHS.map((m) => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Typography>Выполнено Д/З</Typography>
              <Typography variant="h6">
                {stats.done_count_homework}/{stats.all_count_homework}
              </Typography>
            </Box>
          </Box>

          {/* Успеваемость */}
          <Box
            flex={1}
            sx={{
              backgroundColor: '#f8f8f8',
              borderRadius: 2,
              p: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant={'h5'} fontWeight="bold" mb={1} sx={{ color: '#005343' }}>
              Успеваемость
            </Typography>

            <Tooltip title="Сколько баллов из всех возможных получено">
              <Typography>Набрано баллов</Typography>
            </Tooltip>
            <Typography variant="h5" fontWeight="bold">
              {stats.done_ball}/{stats.all_ball} ({stats.procent}%)
            </Typography>

            <Tooltip title="Школьная оценка по баллам">
              <Typography mt={2}>Оценка</Typography>
            </Tooltip>
            <Typography variant="h4" fontWeight="bold" color="error">
              {stats.grade}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </SidebarLayout>
  );
};
