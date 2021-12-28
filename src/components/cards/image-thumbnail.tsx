import { Badge, Flex, Icon, Image } from "@chakra-ui/react";
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
      <Flex
        w="90%"
        position="absolute"
        flexDirection="row"
        justifyContent="space-between"
        left="-5px"
        top="-5px"
      >
        <Badge
          colorScheme="green"
          borderRadius="xl"
          visibility={isNew ? "visible" : "hidden"}
        >
          new
        </Badge>
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
      <Image
        mr={5}
        src={fileSrc}
        fallbackSrc="/images/no-image.jpg"
        boxSize="100px"
        borderRadius="md"
        objectFit="cover"
      />
    </Flex>
  );
}
