import User from '@/utilis/models/User';
import { connectToDB } from '@/utilis/connectToDB';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export const POST = async (request: any) => {
  const { name, phone, email, password, role, school } = await request.json();

  await connectToDB();

  // Check if email already exists
  const existingEmailUser = await User.findOne({ email });
  if (existingEmailUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  // Check if name already exists
  const existingNameUser = await User.findOne({ name });
  if (existingNameUser) {
    return new NextResponse("Name is already taken", { status: 400 });
  }

  // Hash password and create a new user
  const hashPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    name,
    phone,
    role,
    school,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("User is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
};
