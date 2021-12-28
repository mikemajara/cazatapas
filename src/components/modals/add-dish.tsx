import React, { useState } from "react";
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
  Flex,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { Camera } from "phosphor-react";
import { RatingComponent } from "@components/rating-component";
import { IoIosAdd } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import { logger } from "@lib/logger";
import ImageThumbnailComponent from "@components/cards/image-thumbnail";

const Form = (props) => {
  const [files, setFiles] = useState<File[]>([]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      logger.debug("add-dish.tsx:acceptedFiles", acceptedFiles);
      const newFiles = [
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) }),
        ),
      ];
      setFiles(newFiles);
      // setIsModified(isModified || newFiles.length > 0);
    },
  });
  const handleLocalImageDelete = (name: string) => {
    const newFiles = files.filter((e) => e.name !== name);
    setFiles(newFiles);
  };
  const thumbs = files.map((file) => {
    return (
      <ImageThumbnailComponent
        isNew
        key={file.name}
        fileName={file.name}
        fileSrc={file.preview}
        handleImageDelete={() => handleLocalImageDelete(file.name)}
      />
    );
  });
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
        <SimpleGrid columns={3} justifyItems="center">
          {thumbs}
          <Flex
            mt={5}
            justifyContent="center"
            alignItems="center"
            boxSize="100px"
            bgColor="gray.200"
            borderRadius="md"
            fontSize="38px"
            cursor="pointer"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon color="gray.500" as={IoIosAdd} />
          </Flex>
        </SimpleGrid>

        {/* <ul>
          {acceptedFiles.map((file) => (
            <li key={file.path}>
              {file.path} - {file.size} bytes
            </li>
          ))}
        </ul> */}
        {/* <IconButton
          aria-label="add image"
          w="full"
          variant="solid"
          icon={<Camera />}
        /> */}
      </Stack>
    </Stack>
  );
};

export const ModalAddDish = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {React.cloneElement(props.button, { onClick: onOpen })}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        // isCentered
        scrollBehavior="inside"
      >
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
