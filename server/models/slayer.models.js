import { Schema, model } from "mongoose"

const SlayerSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "What shall we call you?"],
            minlength: [3, "Name must be at least 3 characters"],
            maxlength: [15, "Name must not exceed 15 characters"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
        },

        skills: {
            type: [String],
            validate: [ {
                validator: arr => arr.length <= 4,
                message: "You can select up to 4 skills"
            },
            {
                validator: arr => arr.length >= 2,
                message: "You must select at least 2 skills"
            }
        ],
            enum: [
            "Trap Setting",
            "Tracking",
            "Magic",
            "Weapons",
            "Alchemy",
            "Beast Taming",
            ],    
        },

        bio: {
            type: String,
            maxlength: [200, "Too long winded. Do not exceed 200 characters"],
        },

        acceptedHunts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Hunt",
        },
    ],

        completedHunts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Hunt",
        },
    ],

        goldEarned: {
            type: Number,
            default: 0,
        },
    }, { timestamps: true }
)

const Slayer = model("Slayer", SlayerSchema)

export default Slayer
