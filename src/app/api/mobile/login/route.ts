import { connectToDB } from "@/utilis/connectToDB";
import User from "@/utilis/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";


export const POST = async  (req: NextRequest) => {
    try {
        await connectToDB();

        const {email, password} = await req.json();
        const user: any = User.findOne({email});

        if(!user){
            return NextResponse.json({error: 'User not found'}, {status: 400})
        }

        const isValid = await bcrypt.compare(password, user.password);
        if(isValid){
            return NextResponse.json({error: 'Invalid credentials'}, {status: 401});
        }

        //Create a JWT token for the app 
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                school: user.school,
                role: user.role,
            },
            process.env.NEXTAUTH_SECRET!,
            {expiresIn: '7d'}
        );

        // return token + user info
        return NextResponse.json(
        {
            success: true,
            token,
            user: {
            id: user._id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            school: user.school,
            role: user.role,
            },
        },
        { status: 200 }
        );
    } catch (error) {
        console.error('Login error', error);
         return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    };
};