import { connectToDB } from "@/utilis/connectToDB";
import User from "@/utilis/models/User";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";



export const GET = async (req: NextRequest) => {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

    const userRoles = (token?.role as string[]) || [];
    const isAdmin = userRoles.includes("admin");

    if(!isAdmin) return new NextResponse('Unauthorized', { status: 401 })

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