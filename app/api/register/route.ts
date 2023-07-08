import prisma from "@/lib/prisma/client";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { v4 } from "uuid";

interface IRequest {
  fullname: string;
  email: string;
  username: string;
  password: string;
}

interface INewResponse {
  fullname: string;
  email: string;
  username: string;
}

type NewResponse =
  | NextResponse<{ user?: INewResponse; error?: string }>
  | undefined;

export const POST = async (req: Request): Promise<NewResponse> => {
  const { fullname, email, password, username } =
    (await req.json()) as IRequest;

  const user = await prisma.user_credentials.findFirst({
    where: {
      email: email,
    },
  });

  if (user) {
    return NextResponse.json(
      { error: "Email Already Register" },
      { status: 409, statusText: "User Exist" }
    );
  }

  const hashpass = await hash(password, 12);

  try {
    const payload = {
      id: v4(),
      fullname,
      email,
      username,
      password: hashpass,
    };
    const user_create = await prisma.user_credentials.create({ data: payload });

    const { password: pass, ...without_pass } = user_create;

    return NextResponse.json({ user: without_pass }, { status: 201 });
  } catch (error: unknown) {
    console.log(error);
  }
};
