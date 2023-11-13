import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';

import { deleteUserAPI } from '../api/settings.api';
import { DeleteUserFormType } from '../types/form.types';

export function useDeleteUserModal(handleClose: Function) {
  const { mutate: deleteMutation, isLoading } = useMutation({
    mutationFn: async (password: string) => {
      return deleteUserAPI(password).finally(() => handleClose());
    },
  });

  const handleDeleteUser = useCallback(
    async (data: DeleteUserFormType) => {
      deleteMutation(data.password);
    },
    [deleteMutation]
  );

  return {
    isLoading,
    handleDeleteUser,
  };
}
