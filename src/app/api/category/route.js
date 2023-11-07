import Category from "@/app/models/category";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  try {
    const categories = await Category.find({}).sort({ createdAt: "-1" });
    return NextResponse.json(categories);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err: "Server error, Please try again.",
      },
      { status: 500 }
    );
  }
}