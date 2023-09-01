"use client";
import React, { useCallback, useEffect, useState } from "react";
import prisma from "@/lib/prisma/client";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import { games_list } from "@prisma/client";
import { UseSearchContext } from "@/context/SearchCtx";
import { Loader2 } from "lucide-react";

type Props = {
  games: games_list[];
};

const Games = async (props: Props) => {
  const [data_games, setDataGames] = useState<games_list[]>([]);
  const { search, action } = UseSearchContext();
  const [filter, setFilter] = useState<games_list[]>([]);

  const handleFilter = useCallback(() => {
    let tempData = [...props.games];
    if (search) {
      tempData = tempData.filter((item) => {
        return item.Title?.toLowerCase().includes(search.toLowerCase());
      });
    }

    if (action) {
      tempData = tempData.filter((item) => {
        return item.category === action;
      });
    }

    return tempData;
  }, [search, action, props.games]);

  const customLoader = ({ src }: { src: string }) => {
    return src;
  };

  useEffect(() => {
    let active = true;
    setFilter(handleFilter());
    return () => {
      active = false;
    };
  }, [handleFilter]);

  if (!props.games) {
    return (
      <>
        <Container>
          <div className="px-8 pt-5">
            <div className="flex justify-start items-center gap-2">
              <Loader2 className="animate-spin" />
              <h1>Loading</h1>
            </div>
          </div>
        </Container>
      </>
    );
  }

  return (
    <Container>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-11 gap-y-6 gap-x-5 place-items-center px-8 pt-10 transition-all duration-1000 ease-linear">
        {filter &&
          filter.map((game) => {
            const { Id, hero_image } = game;
            return (
              <div key={Id} className="w-[100%]">
                <Link href={"#"} className="">
                  <Image
                    className="w-[100%] object-cover rounded-[1rem] mx-auto aspect-square"
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
      <div className="flex justify-center items-center">
        <div className="text-base font-medium py-10 gap-2 flex justify-center items-center">
          <button className="px-4 py-2 border">Prev</button>
          <button className="px-4 py-2 border">1</button>
          <button className="px-4 py-2 border">2</button>
          <button className="px-4 py-2 border">3</button>
          <button className="px-4 py-2 border">4</button>
          <button className="px-4 py-2 border">Next</button>
        </div>
      </div>
    </Container>
  );
};

export default Games;
