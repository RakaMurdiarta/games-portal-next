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
      <div className="grid grid-cols-auto-fit gap-x-7 gap-y-10 px-8 pt-10 transition-all duration-1000 delay-500 ease-linear">
        {filterData &&
          filterData.map((game) => {
            const { Id, hero_image } = game;
            return (
              <div key={Id} className="">
                <Link href={"#"} className="">
                  <Image
                    className="object-cover rounded-[1rem] aspect-square"
                    src={hero_image || ""}
                    alt=""
                    width={400}
                    height={400}
                    loader={customLoader}
                    unoptimized
                  />
                </Link>
              </div>
            );
          })}
      </div>
    </Container>
  );
};

export default Games;
