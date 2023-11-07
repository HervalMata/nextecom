import dbConnect from "@/utils/dbConnect";
import Category from "@/app/models/category";
import slugify from "slugify";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  await dbConnect();

  try {
    const { name } = body;

    const category = await Category.create({
      name,
      slug: slugify(name),
    });

    return NextResponse.json(category);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
}