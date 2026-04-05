import { NextResponse } from "next/server";

/** This site is showcase-only; no selling or payments. */
export async function POST() {
  return NextResponse.json(
    { error: "This site does not accept payments. Clone or download the repo to use the tools." },
    { status: 410 }
  );
}
