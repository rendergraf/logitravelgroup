import React from "react";
import { Flex, Container } from "@chakra-ui/react";
import { TodoList } from "../components";
import Footer from "../components/Footer";

function AppUI() {
  return (
    <Flex py={12} flexDirection="column">
      <Container maxW={"900px"}>
        <TodoList />
      </Container>
      <Footer />
    </Flex>
  );
}

export default AppUI;
