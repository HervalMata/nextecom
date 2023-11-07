import dbConnect from "@/utils/dbConnect";
import Category from "@/app/models/category";
import slugify from "slugify";
import { NextResponse } from "next/server";

export async function PUT(req, context) {
  await dbConnect();
  const body = await req.json();

  try {
    const updatingCategory = await Category.findByIdAndUpdate(
      context.params.id,
      { ...body, slug: slugify(body.name) },
      { new: true }
    );

    return NextResponse.json(updatingCategory);
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