import React from 'react';

import { Modal } from '@/components';

import { useDeleteUserModal } from '../hooks/delete-user-modal.hook';
import { DeleteUserFormType, deleteUserFormSchema } from '../types/form.types';

interface iDeleteUserModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const DeleteUserModal: React.FC<iDeleteUserModalProps> = ({
  handleClose,
  isOpen,
}) => {
  const { handleDeleteUser, isLoading } = useDeleteUserModal();

  return (
    <Modal<DeleteUserFormType>
      isOpen={isOpen}
      onClose={handleClose}
      title="Confirme sua identidade"
      formProps={{
        submitButtonText: 'Confirmar',
        handleSubmit: handleDeleteUser,
        zodSchema: deleteUserFormSchema,
        isLoading,
        inputs: [
          {
            name: 'password',
            type: 'password',
            placeholder: 'Insira sua senha',
            autoFocus: true,
          },
        ],
      }}
    />
  );
};

export default DeleteUserModal;
