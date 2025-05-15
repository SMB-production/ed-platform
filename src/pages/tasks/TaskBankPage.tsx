import {
  Box,
  Button,
  Chip,
  Container,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useTaskBank } from '@/shared/api/queries/taskBankApi.ts';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SubjectSelect, SubjectSelectRaw } from '@/shared/components/subject-select.tsx';

export const TaskBankPage = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    subject: '',
    exam_number: '',
    is_auto: '',
  });

  const [page, setPage] = useState(0);
  const pageSize = 20;

  const queryParams = {
    page: page + 1,
    pageSize,
    ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== '')),
  };

  const { data, isLoading, isError } = useTaskBank(queryParams);

  const handleReset = () => {
    setFilters({
      subject: '',
      exam_number: '',
      is_auto: '',
    });
  };

  return (
    <SidebarLayout>
      <Container maxWidth="xl">
        <Paper sx={{ p: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4">Банк заданий</Typography>
            <Button variant="contained" color="success" onClick={() => navigate('/create-task')}>
              Создать задание
            </Button>
          </Box>

          {/* Фильтры */}
          <Box display="flex" gap={2} mb={3} alignItems="center">
            <SubjectSelectRaw
              value={filters.subject}
              onChange={(e) => setFilters((prev) => ({ ...prev, subject: e.target.value }))}
            />

            <TextField
              label="Номер задания"
              type="number"
              value={filters.exam_number}
              onChange={(e) => setFilters((prev) => ({ ...prev, exam_number: e.target.value }))}
            />
            <Select
              displayEmpty
              value={filters.is_auto}
              onChange={(e) => setFilters((prev) => ({ ...prev, is_auto: e.target.value }))}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">Авто-проверка?</MenuItem>
              <MenuItem value="true">Да</MenuItem>
              <MenuItem value="false">Нет</MenuItem>
            </Select>
            <Button variant="outlined" onClick={handleReset}>
              Сбросить фильтры
            </Button>
          </Box>

          {/* Таблица */}
          {isLoading && <Typography>Загрузка...</Typography>}
          {isError && <Typography color="error">Ошибка при загрузке</Typography>}

          {data && (
            <>
              <Table>
                <TableHead sx={{ backgroundColor: '#e9ecef' }}>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Вопрос</TableCell>
                    <TableCell>Ответ</TableCell>
                    <TableCell>Предмет</TableCell>
                    <TableCell>Номер задания</TableCell>
                    <TableCell>Авто?</TableCell>
                    <TableCell>Балл</TableCell>
                    <TableCell>Подробнее</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.results.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.id}</TableCell>
                      <TableCell>{task.question}</TableCell>
                      <TableCell>{task.correct_answer}</TableCell>
                      <TableCell>{task.subject}</TableCell>
                      <TableCell>{task.exam_number}</TableCell>
                      <TableCell>
                        <Chip
                          label={task.is_auto ? 'Да' : 'Нет'}
                          color={task.is_auto ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{task.ball}</TableCell>
                      <TableCell>
                        <Button size="small" variant="outlined" onClick={() => navigate(`/task/${task.id}`)}>
                          Подробнее
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
