import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextApiRequest } from "next";

const secret = "rakamurdiarta";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret, raw: true });
  console.log(req.headers.get("authorization"), "ini token");

  return NextResponse.json({ token_data: token });
}
