'use server';

import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

interface Usuario {
  nomeCompleto: string;
  email: string;
  senha: string;
}

export async function POST(request: Request) {
  try {
    const client = await db.connect();
    const data: Usuario = await request.json();
    const { nomeCompleto, email, senha } = data;

    // Verificar se o email já existe
    const usuarioExistente = await client.sql`
      SELECT id FROM t_users WHERE email = ${email}
    `;

    if (usuarioExistente.rows.length > 0) {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 400 }
      );
    }

    // Criptografar a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Inserir novo usuário
    const resultado = await client.sql`
      INSERT INTO t_users (full_name, email, password, role, created_at)
      VALUES (${nomeCompleto}, ${email}, ${senhaCriptografada}, 'A', NOW())
      RETURNING id
    `;

    return NextResponse.json({ 
      message: "Usuário criado com sucesso",
      userId: resultado.rows[0].id 
    });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json(
      { error: "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}
