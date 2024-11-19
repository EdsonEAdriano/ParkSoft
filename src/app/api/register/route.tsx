'use server';

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface IUser {
  email: string;
  password: string;
  name: string;
}

export async function POST(request: Request) {
  // Chama corretamente o método .json() para obter os dados da requisição
  const data: IUser = await request.json();

  const { email, password, name } = data;

  // Console para verificar os dados
  console.log('Dados da api', data);

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await prisma.t_users.create({
      data: { email, password: hashedPassword, full_name: name, role: "USER", created_at: new Date() },
    });
    return NextResponse.json({ message: "User created successfully", user });
  } catch (error) {
    console.error('Error while creating user:', error);
    return NextResponse.json({ error: "Error while creating user" }, { status: 500 });
  }
}
