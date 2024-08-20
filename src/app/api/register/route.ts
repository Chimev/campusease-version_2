import User from '@/utilis/models/User';
import {connectToDB} from '@/utilis/connectToDB';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';


export const POST = async (request: any) => {
    const {name, email, password} =  await request.json();

    await connectToDB();

    //checkin if user already exist
    const existinUser = await User.findOne( { email });

    if(existinUser) {
        return new NextResponse("Email is already in use", {status: 400})
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const newUser = new User({
        name,
        email,
        password: hashPassword
    });

    try {
        await newUser.save();
        return new NextResponse("User is registered", {status: 200});
    } catch (err: any) {
        return new NextResponse(err, {
            status: 500
        })
;    }
}

