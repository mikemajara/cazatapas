import {
  Badge,
  Box,
  Flex,
  Icon,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { Check, CheckCircle } from "phosphor-react";
import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";

interface Props {
  isLoading?: boolean;
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
    isLoading = false,
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
        opacity={isLoading && 0.4}
        src={fileSrc}
        fallbackSrc="/images/no-image.jpg"
        boxSize="100px"
        borderRadius="md"
        objectFit="cover"
      />
      <Flex
        w="112%"
        position="absolute"
        flexDirection="row"
        justifyContent="space-between"
        left="-5px"
        top="-5px"
      >
        {isLoading ? (
          <Spinner
            size="sm"
            borderRadius="xl"
            visibility={isLoading ? "visible" : "hidden"}
          />
        ) : (
          <Box
            p={0.5}
            border="1.5px solid #00ca0c"
            borderRadius="2xl"
            bg="green.100"
          >
            <Check size={10} color="#00ca0c" weight="bold" />
          </Box>
        )}
        {isHovered && (
          <Icon
            as={GrFormClose}
            bg="gray.300"
            fontSize="lg"
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.600"
            onClick={() => handleImageDelete()}
            cursor="pointer"
          />
        )}
      </Flex>
    </Flex>
  );
}
