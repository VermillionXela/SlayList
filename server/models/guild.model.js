import { Schema, model } from "mongoose"

const GuildSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "The realm must know your Guild's name!"],
            minlength: [3, "Guild name must be at least 3 characters long"],
            maxlength: [30, "Guild name must not exceed 30 characters"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        }
    }, { timestamps: true }
)

const Guild = model("Guild", GuildSchema)
export default Guild
