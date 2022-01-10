import React, { useEffect, useRef, useState } from "react";
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
  FormHelperText,
  Button,
  useDisclosure,
  Input,
  Stack,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  Box,
} from "@chakra-ui/react";
import { IoIosAdd } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import { logger } from "@lib/logger";
import ImageThumbnailComponent from "@components/cards/image-thumbnail";
import { useForm } from "react-hook-form";
import ky from "ky";
import { useSession } from "next-auth/react";
import { useShallowRouteChange } from "@hooks/use-shallow-route-change";
import { toast } from "@lib/toast";
import { useRouter } from "next/router";
import _, { indexOf } from "lodash";
import DropzoneComponent from "@components/dropzone-component";

export const ModalAddRestaurant = (props) => {
  const {
    isOpen,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const { status } = useSession();
  const router = useRouter();

  const [setKeyAddRestaurant, unsetKeyAddRestaurant] =
    useShallowRouteChange("addRestaurant");

  const onOpen = () => setKeyAddRestaurant(true, onOpenModal);
  const onClose = () => unsetKeyAddRestaurant(onCloseModal);

  useEffect(() => {
    props.isOpen && onOpenModal();
  }, [props.isOpen]);

  const [files, setFiles] = useState<File[]>([]);

  const handleOnOpenModal = () => {
    if (status === "authenticated") {
      onOpen();
    } else if (status === "unauthenticated") {
      toast.warning(
        `[Log in](/auth/signin?callbackUrl=${router.asPath}) to add a restaurant.`,
      );
    }
  };

  // react-hook-form
  const { handleSubmit, register, reset } = useForm();

  async function onSubmit(values) {
    logger.debug("onSubmit:values", values);
    let linkedImages = files.map((e: any) => ({
      fileName: e.key,
    }));
    try {
      await ky.post(`/api/restaurants`, {
        json: {
          ...values,
          images: {
            create: linkedImages,
          },
        },
      });
      onClose();
      reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {React.cloneElement(props.button, {
        onClick: handleOnOpenModal,
      })}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Add restaurant</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <FormControl>
                  <FormLabel htmlFor="restaurant">
                    Restaurant
                  </FormLabel>
                  <Input name="restaurant" {...register("name")} />
                  <FormHelperText>
                    Search for the restaurant.
                  </FormHelperText>
                </FormControl>
                {/* <Box>UploadedFiles: {uploadedFiles.length}</Box> */}
                <DropzoneComponent
                  files={files}
                  setFiles={setFiles}
                  directory="restaurants"
                />
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                type="submit"
                variant="solid"
                colorScheme="orange"
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
