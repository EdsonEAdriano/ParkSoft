import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Permitir acesso às rotas /login e /register sem autenticação
  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.next();
  }

  // Se não houver sessão, redireciona para /login
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Continuar para a rota protegida
  return NextResponse.next();
}

// Configura o middleware para aplicar a lógica em todas as rotas
export const config = {
  matcher: ["/:path*"], // Bloqueia todas as rotas
};
