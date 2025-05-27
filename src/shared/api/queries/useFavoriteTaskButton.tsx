import { IconButton, Tooltip } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/queries/base.ts';

const pastelGold = '#E6C200';

export const useFavoriteTaskButton = (taskId: number) => {
  const [added, setAdded] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append('task', String(taskId));
      await axiosInstance.post('/api/v1/learn/selectedtasks/', formData);
    },
    onSuccess: () => setAdded(true),
  });

  const FavoriteButton = () => (
    <Tooltip title={added ? 'Добавлено в избранное' : 'Добавить в избранное'}>
      <span>
        <IconButton onClick={() => mutation.mutate()} disabled={added || mutation.isPending} size="small">
          {added ? <StarIcon sx={{ color: pastelGold }} /> : <StarBorderIcon />}
        </IconButton>
      </span>
    </Tooltip>
  );

  return { FavoriteButton, isAdded: added };
};
