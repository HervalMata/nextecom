import User from "@/app/models/user";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  await dbConnect();

  try {
    const { name, email, password } = body;

    await new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    }).save();
    return NextResponse.json({ success: "Registrado com sucesso" });
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}