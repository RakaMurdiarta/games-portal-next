import React, { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { type NextRequest } from "next/server";
import AppBar from "@/components/AppBar";
import prisma from "@/lib/prisma/client";
import FilterController from "@/components/FilterController";
import Games from "@/components/Games";
import Container from "@/components/Container";
import { Loader2 } from "lucide-react";
import { cookies, headers } from "next/headers";
import { getToken } from "next-auth/jwt";

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

async function getTokenNew(token: string) {
  const res = await fetch("http://localhost:3000/api/authentication", {
    cache: "no-cache",
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.json();
}

async function getGames() {
  const resp = await prisma.games_list.findMany({
    take: 1000,
  });

  if (!resp) {
    throw new Error("Failed load game data");
  }

  return resp;
}

export const revalidate = 60;

const Page = async () => {
  const headersList = cookies();
  const token = headersList.get("next-auth.session-token");
  const session = await getServerSession(authOptions);
  const data = await getListCategoryGames();
  const games = await getGames();
  const tokenRes = await getTokenNew(token?.value as string);
  console.log("ini TOken get ", tokenRes);

  return (
    <React.Fragment>
      <AppBar session={session && session.user} />
      <FilterController getDataUnique={data} />
      <Suspense
        fallback={
          <Container>
            <div className="px-8 pt-5">
              <div className="flex justify-start items-center gap-2">
                <Loader2 className="animate-spin" />
                <h1>Loading</h1>
              </div>
            </div>
          </Container>
        }
      >
        <Games games={games} />
      </Suspense>
    </React.Fragment>
  );
};

export default Page;
