import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import UserModel from "@/model/User";

export async function POST(request) {
    console.log("Route was hit");
    await dbConnect();

    try {
        // Parse and validate input
        const { username, email, password } = await request.json();
        console.log("Received payload:", { username, email, password });

        if (!username || !email || !password) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Username, email, and password are required",
                }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Check if username is already verified
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true,
        });

        if (existingUserVerifiedByUsername) {
            return new Response(
                JSON.stringify({ success: false, message: "Username already exists" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Check if email already exists
        const existingUserByEmail = await UserModel.findOne({ email });
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return new Response(
                    JSON.stringify({ success: false, message: "Email already exists" }),
                    { status: 400, headers: { "Content-Type": "application/json" } }
                );
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verificationCode = verificationCode;
                existingUserByEmail.verificationCodeExpiry = new Date(Date.now() + 3600000); // 1 hour expiry
                await existingUserByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verificationCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                message: [],
            });
            await newUser.save();
        }

        // Send verification email
        const emailResponse = await sendVerificationEmail(email, username, verificationCode);

        if (!emailResponse.success) {
            console.error("Error sending verification email:", emailResponse.message);
            return new Response(
                JSON.stringify({
                    success: false,
                    message: emailResponse.message,
                }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "User registered successfully. Please verify your email address",
            }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error registering user:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error registering user",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
