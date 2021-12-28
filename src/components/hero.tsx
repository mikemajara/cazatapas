import { Flex, Heading } from "@chakra-ui/react";

export const Hero = ({ children }: { children: React.ReactNode }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    h="50vh"
    // bgGradient="linear(to-l, #7928CA, #FF0080)"
    bg="gray.800"
    bgClip="text"
  >
    <Heading fontSize="6vw">{children}</Heading>
  </Flex>
);

Hero.defaultProps = {
  title: "with-chakra-ui-typescript",
};
