import { NextRequest, NextResponse } from "next/server";

const users = [
  {
    id: 1,
    name: "ahmed ali",
    email: "ahmed@gmail.com",
  },
];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  users.push(body)
  return NextResponse.json({
    message: "User added successfully",
    users: users
  });
}
