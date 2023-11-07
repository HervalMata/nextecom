import dbConnect from "@/utils/dbConnect";
import Product from "@/app/models/product";
import slugify from "slugify";
import {NextResponse} from "next/server";

export async function POST(req) {
    const _req = await req.json();
    await dbConnect();

    try {
        const product = await Product.create(
            {
                ..._req,
                slug: slugify(_req.title),
            }
        );

        return NextResponse.json(product);
    } catch (err) {
        return NextResponse.json(
            {
                err: err.message,
            },
            { status: 500 }
        );
    }
}