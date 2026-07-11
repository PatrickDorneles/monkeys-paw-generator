import { NextResponse } from "next/server";
import { redis } from "@/lib/ratelimit";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const { wish, story } = await req.json();

    if (!wish || !story) {
      return NextResponse.json({ error: "Missing wish or story" }, { status: 400 });
    }

    const id = randomUUID().slice(0, 8);
    const key = `fate:${id}`;
    
    // Store for 24 hours
    await redis.set(key, JSON.stringify({ wish, story }), { ex: 86400 });

    return NextResponse.json({ id });
  } catch (error) {
    console.error("Share error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
