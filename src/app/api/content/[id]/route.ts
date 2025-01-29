// app/api/content/[id]/route.ts
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Content from "@/models/Content";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


//PUT api to update the cointent via id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await req.json();
    await connectToDB();

    const updatedContent = await Content.findOneAndUpdate(
      { _id: params.id, userId: (session.user as any).id },
      { title, content, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedContent) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json(updatedContent);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating content" },
      { status: 500 }
    );
  }
}


//DELETE api to delete the specific content via id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const deletedContent = await Content.findOneAndDelete({
      _id: params.id,
      userId: (session.user as any).id,
    });

    if (!deletedContent) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Content deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting content" },
      { status: 500 }
    );
  }
}
