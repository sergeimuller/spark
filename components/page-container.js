import { Flex } from "@chakra-ui/react";

export default function PageContainer({isFixedNav, children}) {
  return (
    <Flex
      bg="secondary.background"
      minHeight="100%"
      width="100%"
      alignItems="center"
      justifyContent="top"
      flexDirection="column"
      paddingTop={isFixedNav ? { md: "4rem" } : "0"}
    >
      {children}
    </Flex>
  );
}