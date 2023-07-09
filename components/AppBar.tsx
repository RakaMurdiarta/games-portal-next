import React from "react";
import { IUser } from "@/app/types/type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Container from "./Container";

type Props = {
  session: IUser;
};

const AppBar = async (props: Props) => {
  return (
    <>
      <div className="p-8 bg-gradient-to-tr from-blue-800 to-purple-700">
        <Container>
          <div className="flex justify-between items-center">
            <div className="text-white text-2xl font-semibold">
              Games Portal
            </div>
            <div className="w-full max-w-sm items-center space-x-2 hidden lg:flex"></div>
            <div className="flex justify-center items-center gap-3 text-white text-sm">
              {props.session ? (
                <>
                  <div className="hidden md:block">{props.session.email}</div>
                  <Avatar className="w-12 h-12 md:h-10 md:w-10">
                    <AvatarImage
                      src={`${
                        props.session.image ?? "https://github.com/shadcn.png"
                      }`}
                      alt={props.session.username as string}
                    />
                    <AvatarFallback>R</AvatarFallback>
                  </Avatar>
                </>
              ) : null}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AppBar;
