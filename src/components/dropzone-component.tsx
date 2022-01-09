import {
  Stack,
  Image,
  FormLabel,
  SimpleGrid,
  Flex,
  Icon,
} from "@chakra-ui/react";
import ky from "ky";
import _ from "lodash";
import { logger } from "@lib/logger";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosAdd } from "react-icons/io";
import ImageThumbnailComponent from "./cards/image-thumbnail";

const TIMEOUT_UPLOAD_SECONDS = 30;

export default function DropzoneComponent(props: any) {
  const { files, setFiles, directory } = props;

  useEffect(() => {
    // cleanup
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const flagUploadedImages = (uploadedFile) => {
    setFiles((files) => {
      for (let i = 0; i < files.length; i++) {
        if (files[i].name === uploadedFile.originalname) {
          files[i] = {
            ...files[i],
            ...uploadedFile,
            name: files[i].name,
            isLoading: false,
          };
        }
      }
      return [...files];
    });
  };

  const fileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await ky
      .post(`/api/${directory}/upload`, {
        body: formData,
        timeout: 1000 * TIMEOUT_UPLOAD_SECONDS,
      })
      .json();
    flagUploadedImages(response);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: async (acceptedFiles) => {
      logger.debug("add-dish.tsx:acceptedFiles", acceptedFiles);
      const newFiles = [
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            isLoading: true,
          }),
        ),
      ];
      setFiles(newFiles);
      for (const file of newFiles) {
        fileUpload(file);
      }
    },
  });

  const handleLocalImageDelete = (name: string) => {
    setFiles((files) => [...files.filter((e) => e.name !== name)]);
  };

  const thumbs = files.map((file) => {
    return (
      <ImageThumbnailComponent
        isLoading={file.isLoading}
        key={file.name}
        fileName={file.name}
        fileSrc={file.preview}
        handleImageDelete={() => handleLocalImageDelete(file.name)}
      />
    );
  });

  return (
    <Stack>
      <FormLabel>Images</FormLabel>
      <SimpleGrid columns={3} gap={3} justifyItems="center">
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
    </Stack>
  );
}
