import React, { useEffect, useState } from "react";
import { Heading, Box, Stack, HStack } from "@chakra-ui/layout";

interface CategoryProps {
  label: string;
  isSelected?: boolean;
}

const selectedStyle = {
  border: "3px solid",
  borderColor: "blue.300",
};

export function CategoryCard(props: CategoryProps) {
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
        p={4}
        border="1px solid"
        borderColor={"gray.400"}
        borderRadius="xl"
      >
        <Heading size="md">{label}</Heading>
      </Box>
      {/* <HStack></HStack> */}
    </Box>
  );
}
