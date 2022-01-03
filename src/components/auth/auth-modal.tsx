import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AuthForm } from "./auth-form";

export const AuthModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <AuthForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export const withAuthModal = (Component) => (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <AuthModal
        isOpen={isOpen}
        onClose={onClose}
        // type="Sign Up"
        // onSubmit={signUp}
      />
      <Component openAuthModal={onOpen} {...props} />
    </>
  );
};
