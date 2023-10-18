import React from 'react';
import { FieldValues } from 'react-hook-form';
import { Modal as NBModal, IModalProps, VStack } from 'native-base';

import Text from '@/components/layout/Text';
import { THEME } from '@/styles/theme.styles';
import { pagePaddingTop } from '@/styles/common.styles';

import Form from '../Form';
import { iFormProps } from '../Form/types/props.types';

export interface iModalProps<T extends FieldValues> extends IModalProps {
  title?: string;
  formProps?: iFormProps<T>;
}

function Modal<T extends FieldValues>({
  isOpen,
  onClose,
  title,
  children,
  formProps,
  ...rest
}: iModalProps<T>) {
  return (
    <NBModal
      isOpen={isOpen}
      onClose={onClose}
      bg={THEME.colors.screen_white_background}
      px="2.5"
      py={pagePaddingTop}
      flex={1}
      avoidKeyboard={true}
      {...rest}
    >
      <NBModal.CloseButton
        mt="5"
        mr="1"
        alignItems="center"
        justifyContent="center"
        p="4"
        size={5}
        _icon={{
          size: 5,
        }}
      />
      <NBModal.Content w="full" py="3">
        <VStack alignItems="center" w="full" px="3">
          <Text
            content={title ?? 'Modal'}
            fontSize="normalLarge"
            fontWeight="bold"
            color={THEME.colors.dark_text_color}
            style={{
              marginBottom: 8,
              textAlign: 'center',
            }}
          />
          {formProps ? <Form<T> {...formProps} /> : null}
          {children}
        </VStack>
      </NBModal.Content>
    </NBModal>
  );
}

export default Modal;
