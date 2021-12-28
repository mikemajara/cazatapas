import { getSession } from "next-auth/react";

export async function getSessionHandler(context) {
  const session = await getSession(context);

  //if no session found(user hasn’t logged in)
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin", //redirect user to homepage
        permanent: false,
      },
    };
  }
  return { props: { session } };
}
