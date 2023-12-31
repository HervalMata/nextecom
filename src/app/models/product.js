import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const ratingSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            maxLength: 200,
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const likeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            maxLength: 100,
            text: true,
        },
        slug: {
            type: String,
            lowercase: true,
            index: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
            maxLength: 2000,
            text: true,
        },
        price: {
            type: Number,
            trim: true,
            required: true,
            maxLength: 32,
            validate: {
                validator: function (value) {
                    return value !== 0;
                },
                message: "Price must be greater than 0.",
            },
        },
        previousPrice:  Number,
        color: String,
        brand: String,
        stock: Number,
        shipping: {
            type: Boolean,
            default: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        images: [
            {
                public_id: {
                    type: String,
                    default: "",
                },
                secure_url: {
                    type: String,
                    default: "",
                },
            },
        ],
        sold: {
            type: Number,
            default: 0,
        },
        likes: [likeSchema],
        ratings: [ratingSchema],
    },
    { timestamps: true }
);

productSchema.plugin(uniqueValidator);

export default mongoose.models.Product || mongoose.model("Product", productSchema);