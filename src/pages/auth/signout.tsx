import { logger } from "../../../lib/logger";
import { GetStaticProps } from "next";
import { signOut } from "next-auth/react";
import React from "react";

export default function logout() {
  signOut();
  return <div></div>;
}
