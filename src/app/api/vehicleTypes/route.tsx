'use server'; 

import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

 
export async function GET() {
  try {
    const client = await db.connect();
    const { rows } = await client.sql`SELECT 
                                        id,
                                        text
                                      FROM t_vehicle_types`;

    return NextResponse.json({ vehicleTypes: rows });
  } catch (error) {
    console.error('Error while getting vehicle types:', error);

    return NextResponse.json({ error: "Error while getting vehicle types" }, { status: 500 }); 
  }
}
