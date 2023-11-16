import dbConnect from "@/utils/dbConnect";
import Product from "@/app/models/product";
import {NextResponse} from "next/server";
import queryString from "query-string";

export async function GET(req) {
    await dbConnect();

    const searchParams = queryString.parseUrl(req.url).query;
    const { page } = searchParams || {};
    const pageSize = 0;

    try {
        const currentPage = Number(page) || 1;
        const skip = (currentPage - 1) * pageSize;
        const totalProducts = await Product.countDocuments({});

        const products = await Product.find({})
            .skip(skip)
            .limit(pageSize)
            .sort({ createdAt: "-1" });

        return NextResponse.json(
            {
                products,
                currentPage,
                totalPages: Math.ceil(totalProducts / pageSize),
            },
            { status: 200 }
        );
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