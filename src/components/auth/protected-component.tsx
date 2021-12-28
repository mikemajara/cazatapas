import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import React, { Fragment } from "react";
import { logger } from "@lib/logger";

interface Props {
  session: Session;
  children: React.ReactNode;
}

export default function ProtectedComponent(props: Props) {
  const { data: clientSession, status } = useSession();

  if (props.session?.user) {
    return <>{props.children}</>;
  }
  return (
    <>
      <div>Not authorized</div>
      <div>{JSON.stringify(clientSession)}</div>
    </>
  );
}
