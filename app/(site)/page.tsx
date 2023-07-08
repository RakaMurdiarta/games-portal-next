import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

type Props = {};

const Page = async () => {
  const session = await getServerSession(authOptions);
  return <div>{JSON.stringify(session?.user && session, null, 2)}</div>;
};

export default Page;
