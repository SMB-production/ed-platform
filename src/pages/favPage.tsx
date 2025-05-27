import { Box, Button, Chip, Container, Link, Paper, Stack, Typography } from '@mui/material';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';
import { useFavoriteTasks, useRemoveFavoriteTask } from '@/shared/api/queries/useFavoriteTask.ts';

export const FavoritesPage = () => {
  const { data: tasks, isLoading, isError, refetch } = useFavoriteTasks();
  const removeFavorite = useRemoveFavoriteTask();

  const handleRemove = (taskId: number) => {
    removeFavorite.mutate(taskId, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  return (
    <SidebarLayout>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Избранные задания
        </Typography>

        {isLoading && <Typography>Загрузка...</Typography>}
        {isError && <Typography color="error">Ошибка загрузки заданий</Typography>}

        {tasks && tasks.length > 0 ? (
          <Stack spacing={2}>
            {tasks.map((task) => (
              <Paper key={task.id} sx={{ p: 2, position: 'relative' }}>
                <Box display="flex" justifyContent="space-between" alignItems="start">
                  <Box>
                    <Typography fontWeight={600}>
                      №{task.exam_number}: {task.question}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {task.subject} • Макс. балл: {task.ball}
                    </Typography>
                    <Chip
                      label={task.is_auto ? 'Авто-проверка' : 'Ручная проверка'}
                      size="small"
                      color={task.is_auto ? 'default' : 'warning'}
                      sx={{ mt: 1 }}
                    />
                    {task.files?.length > 0 && (
                      <Box mt={1}>
                        <Typography variant="body2">Файлы:</Typography>
                        {task.files.map((f, i) => (
                          <Link key={i} href={f.file} target="_blank" rel="noopener" display="block">
                            {f.file.split('/').pop()}
                          </Link>
                        ))}
                      </Box>
                    )}
                  </Box>

                  <Button variant="outlined" color="error" size="small" onClick={() => handleRemove(task.id)}>
                    Удалить
                  </Button>
                </Box>
              </Paper>
            ))}
          </Stack>
        ) : (
          <Typography>Нет избранных заданий</Typography>
        )}
      </Container>
    </SidebarLayout>
  );
};
