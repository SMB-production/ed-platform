import { useLessonById } from '@/shared/api/queries/lessons/api';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout';
import { Button, Container, Link, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export const LessonDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const lessonId = Number(id);
  const { data, isLoading, isError } = useLessonById(lessonId);
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <Container maxWidth="md">
        {isLoading && <Typography>Загрузка...</Typography>}
        {isError && <Typography color="error">Ошибка при загрузке урока</Typography>}

        {data && (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              {data.title}
            </Typography>

            {data.homework && (
              <Paper
                sx={{
                  mt: 4,
                  p: 3,
                  backgroundColor: '#f9fbe7',
                  borderLeft: '5px solid #cddc39',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Домашнее задание #{data.homework}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Вы можете просмотреть отправленные ответы или приступить к решению.
                </Typography>
                <Button variant="outlined" sx={{ mt: 1 }} onClick={() => navigate(`/homework/${data.homework}/solve`)}>
                  Перейти к домашнему заданию
                </Button>
              </Paper>
            )}

            {data.files.length > 0 && (
              <>
                <Typography variant="h6" mt={3}>
                  Прикреплённые файлы
                </Typography>
                <List>
                  {data.files.map((f, idx) => (
                    <ListItem key={idx}>
                      <ListItemText
                        primary={
                          <Link href={f.file} target="_blank" rel="noopener">
                            {f.file.split('/').pop()}
                          </Link>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Paper>
        )}
      </Container>
    </SidebarLayout>
  );
};
