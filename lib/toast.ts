import { useBreakpoint, useBreakpointValue } from "@chakra-ui/react";
import {
  createStandaloneToast,
  ToastPositionWithLogical,
  UseToastOptions,
} from "@chakra-ui/toast";
import { ReactNode } from "react";

type toastStatus =
  | "success"
  | "error"
  | "warning"
  | "info"
  | undefined;

const defaultConfig: UseToastOptions = {
  duration: 19000,
  isClosable: true,
  position: "bottom-right",
  variant: "subtle",
};

const toastFactory = (status: toastStatus = "info") => {
  return (
    description: string | ReactNode = "",
    config: UseToastOptions = {},
  ) => {
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
