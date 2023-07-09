"use client";
import React from "react";
import prisma from "@/lib/prisma/client";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import { games_list } from "@prisma/client";
import { UseSearchContext } from "@/context/SearchCtx";

type Props = {
  games: games_list[];
};

const Games = async (props: Props) => {
  const { search } = UseSearchContext();

  const filterData = props.games.filter((item) => {
    const newArr = item.Title?.toLowerCase().includes(search.toLowerCase());
    return newArr;
  });

  const customLoader = ({ src }: { src: string }) => {
    return src;
  };

  return (
    <Container>
      <div className="flex justify-center items-center">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-6 gap-x-5 place-items-center px-8 pt-10 transition-all duration-1000 delay-500 ease-linear">
          {filterData &&
            filterData.map((game) => {
              const { Id, hero_image } = game;
              return (
                <div key={Id}>
                  <Link href={"#"} className="">
                    <Image
                      className="w-full object-cover rounded-[1rem] aspect-square"
                      src={hero_image || ""}
                      alt=""
                      width={300}
                      height={300}
                      loader={customLoader}
                      unoptimized
                    />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </Container>
  );
};

export default Games;
