import { NextResponse } from "next/server";
import { buildPayload } from "@/store/use-generator-store";
import { generateEbook } from "@/lib/generator";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = buildPayload(body);
    const ebook = generateEbook(payload);
    return NextResponse.json({ ebook });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to generate e-book at this time. Please try again." },
      { status: 500 }
    );
  }
}
