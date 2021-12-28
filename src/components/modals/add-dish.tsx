import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Text,
  useDisclosure,
  HStack,
  Input,
  Stack,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import { Camera } from "phosphor-react";
import { RatingComponent } from "@components/rating-component";

const Form = (props) => {
  return (
    <Stack>
      <FormControl>
        <FormLabel htmlFor="restaurant">Restaurant</FormLabel>
        <Input name="restaurant" />
        <FormHelperText>Search for the restaurant.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="dish">Dish</FormLabel>
        <Input name="dish" />
        <FormHelperText>Search for the dish.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="rating">Your rating</FormLabel>
        <RatingComponent isEditable />

        <FormHelperText>
          Give your dish some stars, or none if it does not diserve
          them
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="comment">Your comments</FormLabel>
        <Textarea />
        <FormHelperText>Explain your rating</FormHelperText>
      </FormControl>
      <Stack>
        <FormLabel>Image</FormLabel>
        <IconButton
          aria-label="add image"
          w="full"
          variant="solid"
          icon={<Camera />}
        />
      </Stack>
    </Stack>
  );
};

export const ModalAddDish = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {React.cloneElement(props.button, { onClick: onOpen })}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add dish</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="solid" colorScheme="orange">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
