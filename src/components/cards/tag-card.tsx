import React, { useEffect, useState } from "react";
import { Heading, Box, Text, Stack, HStack } from "@chakra-ui/layout";

interface CategoryProps {
  label: string;
  isSelected?: boolean;
}

const selectedStyle = {
  border: "3px solid",
  borderColor: "blue.300",
};

export function TagCard(props: CategoryProps) {
  const { label, isSelected } = props;
  // const [isSelected, setIsSelected] = useState(false);

  // useEffect(() => {
  //   setIsSelected(isSelected);
  // }, [isSelected]);

  return (
    <Box
      border="3px solid"
      borderRadius="2xl"
      borderColor={isSelected ? "blue.300" : "transparent"}
    >
      <Box
        justify="center"
        align="center"
        p={1}
        px={3}
        border="1px solid"
        borderColor={"gray.400"}
        borderRadius="xl"
      >
        <Text size="xs">#{label}</Text>
      </Box>
      {/* <HStack></HStack> */}
    </Box>
  );
}
