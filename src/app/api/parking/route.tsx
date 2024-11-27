'use server'; 

import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";



export async function GET() {
  const client = await db.connect();
  try {
    const { rows } = await client.sql`SELECT 
                                          id,
                                          location_id,
                                          description,
                                          status
                                      FROM t_parking_location
                                      WHERE status <> 'I'
                                      ORDER BY location_id`;    

    return NextResponse.json({ parking: rows });
  } catch (error) {
    console.error('Error while getting parking:', error);
    return NextResponse.json({ error: "Error while getting parking" }, { status: 500 }); 
  } finally {
    client.release();
  }
}