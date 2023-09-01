"use client";

import React, { useRef, useState } from "react";
import Container from "./Container";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { UseSearchContext } from "@/context/SearchCtx";

interface Iunique {
  category: string | null;
}

type Props = {
  getDataUnique: Iunique[];
};

const FilterController = (props: Props) => {
  const { search, setSearch, action, setAction } = UseSearchContext();

  const refInput = useRef<HTMLInputElement | null>(null);

  const [toggle, setToggle] = useState<boolean>(false);

  const unique: (string | null)[] = Array.from(
    new Set(props.getDataUnique.map((item) => item.category))
  );

  const setActionFilter = (text: string) => {
    setAction(text);
  };
  return (
    <React.Fragment>
      <div className="px-8 py-5 border shadow-inner">
        <Container>
          <div className="flex justify-between items-center">
            <Button
              variant={"ghost"}
              size={"icon"}
              className="block xl:hidden hover:bg-white text-center"
              onClick={() => [setToggle((prev) => !prev)]}
            >
              <Menu className="mx-auto" size={30} />
            </Button>
            <div className="xl:flex justify-center items-center gap-8 hidden">
              {unique &&
                unique.map((categories, index) => {
                  return (
                    <button
                      className="text-sm font-medium hover:scale-x-105 hover:text-purple-600 py-2 rounded-lg"
                      key={index}
                      onClick={() =>
                        setActionFilter((categories as string) ?? "")
                      }
                    >
                      {categories?.toLocaleUpperCase()}
                    </button>
                  );
                })}
            </div>
            <div className="flex gap-2 justify-center items-center">
              <Input ref={refInput} type="text" placeholder="search game" />
              <Button
                className="active:scale-105 duration-500 bg-blue-500 text-white hover:bg-blue-700"
                variant={"secondary"}
                type="button"
                onClick={() => {
                  const text = refInput.current!.value;
                  setSearch(text);
                }}
              >
                Search
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ x: -100000 }}
            animate={{ x: 0 }}
            exit={{ x: -100000 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
            className="shadow-inner bg-slate-400 z-50"
          >
            <div className="flex flex-col gap-4 items-center justify-center py-6">
              {unique &&
                unique.map((categories, index) => {
                  return (
                    <button
                      className="text-sm font-medium hover:scale-x-105 hover:text-purple-600 py-2 rounded-lg"
                      key={index}
                    >
                      {categories?.toLocaleUpperCase()}
                    </button>
                  );
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default FilterController;
