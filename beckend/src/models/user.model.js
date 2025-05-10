import mongoose, { Schema } from "mongoose";



const UserSchema = new Schema(
    {
        username:{
            type:String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
          },
          files: [
            {
              type: Schema.Types.Mixed
            },
          ],
          password: {
            type: String,
            required: [true, "Password is required"],
          },
    },
    {timestamps:true}
)

export const User = mongoose.model("User",UserSchema)