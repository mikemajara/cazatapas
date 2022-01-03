import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";

export const MarkdownComponent = ({ children, ...rest }) => (
  <ReactMarkdown children={children} remarkPlugins={[remarkGfm]} />
);
