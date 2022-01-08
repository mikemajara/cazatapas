import {
  Badge,
  Box,
  Flex,
  Icon,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { CheckCircle } from "phosphor-react";
import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";

interface Props {
  isNew?: boolean;
  key: string;
  fileSrc: string;
  fileName: string;
  handleImageDelete: any;
}

export default function ImageThumbnailComponent(props: Props) {
  const {
    key,
    fileSrc,
    fileName,
    isNew = false,
    handleImageDelete,
  } = props;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Flex
      mt={5}
      position="relative"
      key={key}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        opacity={isNew && 0.5}
        mr={5}
        src={fileSrc}
        fallbackSrc="/images/no-image.jpg"
        boxSize="100px"
        borderRadius="md"
        objectFit="cover"
      />
      <Flex
        w="90%"
        position="absolute"
        flexDirection="row"
        justifyContent="space-between"
        left="-5px"
        top="-5px"
      >
        {isNew ? (
          <Spinner
            size="sm"
            borderRadius="xl"
            visibility={isNew ? "visible" : "hidden"}
          />
        ) : (
          <Icon as={CheckCircle} color="green.500" />
        )}
        {isHovered && (
          <Icon
            as={GrFormClose}
            bg="gray.300"
            borderRadius="xl"
            onClick={() => handleImageDelete()}
            cursor="pointer"
          />
        )}
      </Flex>
    </Flex>
  );
}
