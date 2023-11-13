import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRedux } from '@/hooks';

import { updateUserAPI } from '../api/settings.api';
import { EditUserFormType, editUserFormSchema } from '../types/form.types';

export function useSettings() {
  const { user_email, user_name } = useRedux().useAppSelector(
    (state) => state.auth.user_data!
  );

  const methods = useForm<EditUserFormType>({
    resolver: zodResolver(editUserFormSchema),
  });

  const { handleSubmit: handleHookFormSubmit } = methods;

  const [wasFormEdited, setWasFormEdited] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleCloseConfirmationModal = useCallback(() => {
    setIsConfirmationModalOpen(false);
  }, []);

  const handleOpenConfirmationModal = useCallback(() => {
    setIsConfirmationModalOpen(true);
  }, []);

  const { isLoading: isEditingUser, mutateAsync: editUserMutation } =
    useMutation({
      mutationFn: async (userPayload: EditUserFormType) => {
        return updateUserAPI({ ...userPayload }).then(() => {
          setWasFormEdited(false);
        });
      },
    });

  const handleUpdateUser = useCallback(async (data: EditUserFormType) => {
    await editUserMutation(data);
  }, []);

  return {
    isLoading: isEditingUser,
    user_email,
    user_name,
    handleUpdateUser,
    handleCloseConfirmationModal,
    isConfirmationModalOpen,
    handleOpenConfirmationModal,
    wasFormEdited,
    setWasFormEdited,
    handleHookFormSubmit,
    methods,
  };
}
