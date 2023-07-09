import React, { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AppBar from "@/components/AppBar";
import prisma from "@/lib/prisma/client";
import FilterController from "@/components/FilterController";
import Games from "@/components/Games";


const getListCategoryGames = async () => {
  const resp = await prisma.games_list.findMany({
    select: {
      category: true,
    },
  });

  if (!resp) {
    throw new Error("Failed to load data");
  }

  return resp;
};

async function getGames() {
  const resp = await prisma.games_list.findMany({
    take: 500,
  });

  if (!resp) {
    throw new Error("Failed load game data");
  }

  return resp;
}


export const revalidate = 60;

const Page = async () => {
  const session = await getServerSession(authOptions);
  const data = await getListCategoryGames();
  const games = await getGames();

  return (
    <React.Fragment>
      <AppBar session={session && session.user} />
      <FilterController getDataUnique={data} />
      <Suspense fallback={<div>Loading...</div>}>
        <Games games={games} />
      </Suspense>
    </React.Fragment>
  );
};

export default Page;
