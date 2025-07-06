import User from '@/utilis/models/User';
import { connectToDB } from '@/utilis/connectToDB';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/functions/emails/welcomeEmail';

export const POST = async (request: any) => {
  const { name, phone, email, password, role, school, agentApproval } = await request.json();

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
    agentApproval
  });

  try {
    await newUser.save();

    //Send welcome email
    await sendWelcomeEmail({
      user: newUser
    })
    return new NextResponse("User is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
};


export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const searchParams = req.nextUrl.searchParams;
    const school = searchParams.get('school');
    const role = searchParams.get('role');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    // Build filter object dynamically
    const filter: Record<string, any> = {};
    if (school) filter.school = school;
    if (role) filter.role = role;

    // Fetch filtered + paginated users
    const users = await User.find(filter).skip(skip).limit(limit);
    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limit);

    return NextResponse.json({
      users,
      totalUsers,
      totalPages,
      currentPage: page
    }, { status: 200 });

  } catch (error: any) {
    return new NextResponse(error.message || 'Internal Server Error', { status: 500 });
  }
};

