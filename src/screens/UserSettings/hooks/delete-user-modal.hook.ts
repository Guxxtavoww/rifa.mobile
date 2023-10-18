import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { toast } from '@/utils/app.utils';

import { deleteUserAPI } from '../api/user-settings.api';
import { DeleteUserFormType } from '../types/form.types';

export function useDeleteUserModal(handleClose: Function) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: async (password: string) => {
      return deleteUserAPI(password, toast)
        .then(() => handleClose())
        .catch(() => handleClose())
        .finally(() => setIsLoading(false));
    },
  });

  const handleDeleteUser = useCallback(async (data: DeleteUserFormType) => {
    setIsLoading(true);

    deleteMutation.mutate(data.password);
  }, []);

  return {
    isLoading,
    handleDeleteUser,
  };
}
