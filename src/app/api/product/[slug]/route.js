import dbConnect from "@/utils/dbConnect";
import {NextResponse} from "next/server";
import Product from "@/app/models/product";

export async function GET(req, context) {
    await dbConnect();

    try {
        const product = await Product.findOne({ slug: context.params.slug });
        return NextResponse.json(product);
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            {
                err: e.message,
            },
            { status: 500 }
        );
    }
}