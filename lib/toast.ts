import { useBreakpoint, useBreakpointValue } from "@chakra-ui/react";
import {
  createStandaloneToast,
  ToastPositionWithLogical,
  UseToastOptions,
} from "@chakra-ui/toast";

type toastStatus =
  | "success"
  | "error"
  | "warning"
  | "info"
  | undefined;

const defaultConfig: UseToastOptions = {
  duration: 9000,
  isClosable: true,
  position: "bottom-right",
};

const toastFactory = (status: toastStatus = "info") => {
  return (description: string = "", config: UseToastOptions = {}) => {
    const toast = createStandaloneToast();
    toast({
      title: status,
      description,
      status,
      ...defaultConfig,
      ...config,
    });
  };
};

export const toast = {
  success: toastFactory("success"),
  error: toastFactory("error"),
  warning: toastFactory("warning"),
  info: toastFactory("info"),
};
