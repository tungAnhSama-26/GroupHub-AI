console.log("--- ROUTE.TS IS BEING EVALUATED ---");
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const { GET: authGET, POST: authPOST } = toNextJsHandler(auth.handler);

export async function GET(req: NextRequest) {
  try {
    return await authGET(req);
  } catch (error: unknown) {
    console.error(`--- CRASH IN BETTER-AUTH HANDLER (${req.method} ${req.url}) ---`);
    if (error instanceof Error) {
      console.error(error.stack);
    } else {
      console.error(error);
    }
    return NextResponse.json({ error: "Internal Server Error in Auth" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    return await authPOST(req);
  } catch (error: unknown) {
    console.error(`--- CRASH IN BETTER-AUTH HANDLER (${req.method} ${req.url}) ---`);
    if (error instanceof Error) {
      console.error(error.stack);
    } else {
      console.error(error);
    }
    return NextResponse.json({ error: "Internal Server Error in Auth" }, { status: 500 });
  }
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": req.headers.get("origin") || "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
