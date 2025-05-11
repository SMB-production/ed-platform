import { Button, Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAllSubmissions } from '@/shared/api/queries/allSubmissionsApi.ts';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';

export const AllSubmissionsPage = () => {
  const { data, isLoading, isError } = useAllSubmissions();
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <Container maxWidth="xl">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Все решения домашних заданий
          </Typography>

          {isLoading && <Typography>Загрузка...</Typography>}
          {isError && <Typography color="error">Ошибка загрузки</Typography>}

          {data && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Ученик</TableCell>
                  <TableCell>Урок</TableCell>
                  <TableCell>Балл</TableCell>
                  <TableCell>Время выполнения</TableCell>
                  <TableCell>Действие</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>{submission.id}</TableCell>
                    <TableCell>{submission.user}</TableCell>
                    <TableCell>{submission.homework}</TableCell>
                    <TableCell>{submission.result}</TableCell>
                    <TableCell>
                      {new Date(submission.created_at).toLocaleString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => navigate(`/user-homework/${submission.id}`)}>
                        Просмотр
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      </Container>
    </SidebarLayout>
  );
};
