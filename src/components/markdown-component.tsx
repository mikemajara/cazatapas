import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import styles from "../styles/style-markdown.module.scss";

export const MarkdownComponent = ({ children, ...rest }) => (
  <ReactMarkdown
    className={[styles.markdownBody, "markdown-body"].join(" ")}
    children={children}
    remarkPlugins={[remarkGfm]}
  />
);
