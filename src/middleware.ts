import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.match(/\/(api)\/(administrator)(.*)/) &&
    !process.env.NODE_ENV.match("development")
  ) {
    // ローカル以外からのadminエンドポイントへの接続は404にする
    console.warn("admin access from not local");
    return new NextResponse(null, { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
