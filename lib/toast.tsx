import { useBreakpoint, useBreakpointValue } from "@chakra-ui/react";
import {
  createStandaloneToast,
  ToastPositionWithLogical,
  UseToastOptions,
} from "@chakra-ui/toast";
import { ReactNode } from "react";
import { MarkdownComponent } from "@components/markdown-component";

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
    config: UseToastOptions & { markdown?: boolean } = {
      markdown: true,
    },
  ) => {
    const toast = createStandaloneToast();
    const desc = !config.markdown ? (
      description
    ) : (
      <MarkdownComponent>{description}</MarkdownComponent>
    );
    toast({
      title: status,
      description: desc,
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
