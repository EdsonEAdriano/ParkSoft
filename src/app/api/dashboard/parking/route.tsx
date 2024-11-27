'use server'; 

import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";



export async function GET() {
  const client = await db.connect();
  try {
    const { rows } = await client.sql`SELECT 
                                          COUNT(CASE WHEN status <> 'I' THEN 1 END) AS total_spaces,
                                          COUNT(CASE WHEN status = 'A' THEN 1 END) AS available_spaces,
                                          COUNT(CASE WHEN status = 'B' THEN 1 END) AS busy_spaces,
                                          (SELECT COUNT(1) FROM t_entries WHERE entry_date::date = CURRENT_DATE) AS today_entries
                                      FROM t_parking_location`;    

    return NextResponse.json({ parking_status: rows });
  } catch (error) {
    console.error('Error while getting parking status:', error);
    return NextResponse.json({ error: "Error while getting parking status" }, { status: 500 }); 
  } finally {
    client.release();
  }
}