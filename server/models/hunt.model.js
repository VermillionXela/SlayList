import { Schema, model } from "mongoose"

const HuntSchema = new Schema(
    {
        monsterName: {
        type: String,
            required: [true, "Name thy beast!"],
            minlength: [3, "Name must be at least 3 characters long"],
            maxlength: [25, "Name must not exceed 25 characters "]
        },

        description: {
            type: String,
            required: [true, "You must give a brief summation of the foe"],
            minlength: [10, "Description must be at least 10 characters"],
            maxlength: [125, "Description must not exceed 125 characters"]
        },

        monsterImage: {
            type: String,
            required: false
        },

        monsterWeaknesses: {
            type: [String],
            validate: [ {
                validator: arr => arr.length === 3,
                message: "You must select exactly 3 weaknesses"
                }
            ],
            enum: [
                "Trap Setting",
                "Tracking",
                "Magic",
                "Weapons",
                "Alchemy",
                "Beast Taming"
            ]
        },

        reward: {
            type: Number,
            required: [true, "Don't be stingy!"],
            min: [1, "Reward must be at least 1 gold"]
        },

        huntStatus: {
            type: String,
            enum: ["Available", "Accepted", "Completed"],
            default: "Available"
        },

        isCompleted: {
            type: Boolean,
            default: false
        },

        guild: {
            type: Schema.Types.ObjectId,
            ref: "Guild",
            required: true
        },

        slayerAccepted: {
            type: Schema.Types.ObjectId,
            ref: "Slayer"
        },

        slayerCompleted: {
        type: Schema.Types.ObjectId,
        ref: "Slayer"
        }
    }, { timestamps: true }
)

const Hunt = model("Hunt", HuntSchema)
export default Hunt
