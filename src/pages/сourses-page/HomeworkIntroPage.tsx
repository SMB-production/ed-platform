import { Box, Button, Chip, Container, Link, Paper, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { PageLayout } from '@/shared/components/PageLayout/PageLayout';
import { useHomeworkToSolve } from '@/shared/api/queries/solveHomeworkApi/api.ts';
import { FC } from 'react';
import { useFavoriteTaskButton } from '@/shared/api/queries/useFavoriteTaskButton';
import { HomeworkTask } from '@/shared/api/queries/homeworkApi/model.ts';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';

export const HomeworkIntroPage = () => {
  const { id } = useParams<{ id: string }>();
  const homeworkId = Number(id);
  const { data, isLoading, isError } = useHomeworkToSolve(homeworkId);
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          {isLoading && <Typography>Загрузка...</Typography>}
          {isError && <Typography color="error">Ошибка загрузки домашнего задания</Typography>}

          {data && (
            <>
              <Typography variant="h4" gutterBottom>
                {data.title}
              </Typography>

              <Box mt={3}>
                <Typography variant="h6">Задания</Typography>
                <Stack spacing={2} mt={1}>
                  {data.tasks.map((task) => (
                    <Item key={task.number} task={task} />
                  ))}
                </Stack>
              </Box>

              <Box mt={4} textAlign="right">
                {data.is_done ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/homework/${homeworkId}/results`)}
                  >
                    Посмотреть результат
                  </Button>
                ) : (
                  <Button variant="contained" color="success" onClick={() => navigate(`/homework/${homeworkId}/solve`)}>
                    Решить домашнее задание
                  </Button>
                )}
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </SidebarLayout>
  );
};

interface Props {
  task: HomeworkTask;
}

const Item: FC<Props> = ({ task }) => {
  const { FavoriteButton } = useFavoriteTaskButton(task.id);
  return (
    <Paper
      key={task.number}
      sx={{
        p: 2,
        pl: 1,
        borderLeft: '5px solid #005343',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.1)',
      }}
    >
      {/* Иконка избранного */}

      {/* Основное содержимое */}
      <Box>
        <Typography fontWeight={600}>
          №{task.number}: {task.question}
        </Typography>

        {task.is_auto ? (
          <Chip label="Автоматическая проверка" size="small" sx={{ mt: 1 }} />
        ) : (
          <Chip label="Ручная проверка" color="warning" size="small" sx={{ mt: 1 }} />
        )}

        {task.files?.length > 0 && (
          <Box mt={1}>
            <Typography variant="body2">Материалы:</Typography>
            {task.files.map((f, i) => (
              <Link key={i} href={f.file} target="_blank" rel="noopener" display="block">
                {f.file.split('/').pop()}
              </Link>
            ))}
          </Box>
        )}
      </Box>
      <Box pt="4px">{FavoriteButton()}</Box>
    </Paper>
  );
};
