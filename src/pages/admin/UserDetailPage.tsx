import { Box, Container, Typography, Paper, Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useUserDetail } from '@/shared/api/queries/userDetailApi.ts';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';

export const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const { data, isLoading, isError } = useUserDetail(userId);

  return (
    <SidebarLayout>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Пользователь #{userId}
          </Typography>

          {isLoading && <Typography>Загрузка...</Typography>}
          {isError && <Typography color="error">Ошибка загрузки данных</Typography>}

          {data && (
            <>
              {data.photo && (
                <Box textAlign="center" mb={2}>
                  <Avatar src={data.photo} alt={data.username} sx={{ width: 80, height: 80, margin: 'auto' }} />
                </Box>
              )}

              <Typography>
                <strong>ФИО:</strong> {data.username || 'Н/Д'}
              </Typography>
              <Typography>
                <strong>Email:</strong> {data.email || 'Н/Д'}
              </Typography>
              <Typography>
                <strong>Дата рождения:</strong> {data.date_birth || 'Н/Д'}
              </Typography>
              <Typography>
                <strong>Роль:</strong> {data.is_admin ? 'Администратор' : data.is_teacher ? 'Преподаватель' : 'Ученик'}
              </Typography>
            </>
          )}
        </Paper>
      </Container>
    </SidebarLayout>
  );
};
