'use server'; 

import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";


interface ExitEntry {
  id: number;
  exitDate: string;
  price: number;
}


export async function PUT(request: Request) {
  const client = await db.connect();
  try {
    const data: ExitEntry = await request.json();
    const { id, exitDate, price } = data;
    
    console.log('Dados para saída: ', data)

    await client.sql`
      UPDATE t_parking_location
        SET status = 'A'
      FROM t_entries 
      WHERE t_entries.parking_location_id = t_parking_location.id 
        AND t_entries.id = ${id};
    `;

    
    await client.sql`
      UPDATE t_entries 
        SET exit_date = ${exitDate}, price = ${price}, status = 'C'
      WHERE id = ${id}
    `;

    return NextResponse.json({ message: "Entry updated successfully" });
  } catch (error) {
    console.error('Error while updating entry:', error);
    return NextResponse.json({ error: "Error while updating entry" }, { status: 500 });
  } finally {
    client.release();
  }
}
