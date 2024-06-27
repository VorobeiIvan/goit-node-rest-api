import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema(
  {
    username: {
      type: String,
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
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
      default: () => uuidv4(),
    },
  },
  { versionKey: false, timestamps: true },
);

const User = model("user", userSchema);

export default User;