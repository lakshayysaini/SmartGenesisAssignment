import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Content from "@/models/Content";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../utils/AuthOptions";

//POST request to create a new content and save it in database.
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await req.json();
    await connectToDB();

    const newContent = await Content.create({
      title,
      content,
      userId: (session.user as any).id,
    });

    return NextResponse.json(newContent);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating content" },
      { status: 500 }
    );
  }
}


//GET request to fetch all the content of a specific user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const contents = await Content.find({
      userId: (session.user as any).id,
    }).sort({ createdAt: -1 });
    return NextResponse.json(contents);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching contents" },
      { status: 500 }
    );
  }
}
