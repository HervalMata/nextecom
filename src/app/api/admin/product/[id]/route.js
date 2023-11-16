import dbConnect from "@/utils/dbConnect";
import Product from "@/app/models/product";
import {NextResponse} from "next/server";

export async function PUT(req, context) {
    await dbConnect();

    const _req = await req.json();

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            context.params.id,
            { ..._req },
            { new: true }
        );

        return NextResponse.json(updatedProduct);
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

export async function DELETE(req, context) {
    await dbConnect();

    try {
        const deletedProduct = await Product.findByIdAndDelete(
            context.params.id,
        );
        return NextResponse.json(deletedProduct);
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