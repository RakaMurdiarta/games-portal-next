import prisma from "@/lib/prisma/client";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  const { fullname, email, password, username } = await req.json();

  console.log({ fullname, email, password, username });
  const user = await prisma.user_credentials.findFirst({
    where: {
      email: email,
    },
  });

  if (user) {
    return NextResponse.json(
      { msg: "Email Already Register" },
      { status: 409, statusText: "User Exist" }
    );
  }

  const hashpass = await hash(password, 12);

  try {
    const payload = {
      fullname,
      email,
      username,
      password: hashpass,
    };
    const user_create: {
      fullname: string;
      email: string;
      username: string;
      password: string;
    } = await prisma.user_credentials.create({ data: payload });

    const { password: pass, ...without_pass } = user_create;

    return NextResponse.json({ msg: without_pass }, { status: 201 });
  } catch (error: unknown) {
    console.log(error);
  }
}
