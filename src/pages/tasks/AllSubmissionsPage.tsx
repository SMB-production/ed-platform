import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAllSubmissions } from '@/shared/api/queries/allSubmissionsApi.ts';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';
import { useState } from 'react';
import { SubjectSelectRaw } from '@/shared/components/subject-select.tsx';

export const AllSubmissionsPage = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    subject: '',
    course: '',
    teacher: '',
  });

  const [page, setPage] = useState(0);
  const pageSize = 20;

  const queryParams = {
    page: page + 1,
    pageSize,
    ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== '')),
  };

  const { data, isLoading, isError } = useAllSubmissions(queryParams);

  const handleReset = () => {
    setFilters({ subject: '', course: '', teacher: '' });
  };

  return (
    <SidebarLayout>
      <Container maxWidth="xl">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Все решения домашних заданий
          </Typography>

          {/* Фильтры */}
          <Box display="flex" gap={2} mb={3} alignItems="center">
            <TextField
              label="Курс"
              value={filters.course}
              onChange={(e) => setFilters((prev) => ({ ...prev, course: e.target.value }))}
            />
            <SubjectSelectRaw
              value={filters.subject}
              onChange={(e) => setFilters((prev) => ({ ...prev, subject: e.target.value }))}
            />
            <TextField
              label="Преподаватель"
              value={filters.teacher}
              onChange={(e) => setFilters((prev) => ({ ...prev, teacher: e.target.value }))}
            />
            <Button variant="outlined" color="inherit" onClick={handleReset}>
              Сбросить фильтры
            </Button>
          </Box>

          {/* Список */}
          {isLoading && <Typography>Загрузка...</Typography>}
          {isError && <Typography color="error">Ошибка загрузки</Typography>}

          {data && (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Курс</TableCell>
                    <TableCell>Предмет</TableCell>
                    <TableCell>Учитель</TableCell>
                    <TableCell>Ученик</TableCell>
                    <TableCell>Урок</TableCell>
                    <TableCell>Балл</TableCell>
                    <TableCell>Время выполнения</TableCell>
                    <TableCell>Действие</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.results.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>{submission.id}</TableCell>
                      <TableCell>{submission.course}</TableCell>
                      <TableCell>{submission.subject}</TableCell>
                      <TableCell>{submission.teacher}</TableCell>
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
              <TablePagination
                component="div"
                count={data.count}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={pageSize}
                rowsPerPageOptions={[pageSize]} // фиксированный размер
              />
            </>
          )}
        </Paper>
      </Container>
    </SidebarLayout>
  );
};
