// src/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

/* =====================================
   🚀 User Schema Definition
===================================== */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

/* =====================================
   🔒 Password Hashing Middleware
===================================== */
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

/* =====================================
   ✅ Create and Export the User Model
===================================== */
const User = mongoose.model("User", UserSchema);
export default User;
