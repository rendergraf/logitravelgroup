import React, { useContext } from "react";
import {
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { TodoContext } from "../Context";
import { AddIcon } from "@chakra-ui/icons";

const ModalTodo = () => {
  const { isOpen, onOpen, onClose, initialRef, finalRef, crearTodo } =
    useContext(TodoContext);
  const addTodo = (text) => {
    crearTodo(text);
    onClose();
  };

  return (
    <>
      <Flex justifyContent={"flex-end"}>
        <Button rightIcon={<AddIcon />} colorScheme={"todo"} onClick={onOpen}>
          Add
        </Button>
      </Flex>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add item to list</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder="Type the text here..."
                onKeyDown={(event) => {
                  if (event.key === "Enter" && initialRef.current.value) {
                    addTodo(initialRef.current.value);
                  }
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter gap={5}>
            <Button
              onClick={() =>
                initialRef.current.value && addTodo(initialRef.current.value)
              }
              colorScheme={"todo"}
            >
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalTodo;
