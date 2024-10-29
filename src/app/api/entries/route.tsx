'use server'; 

import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

 
export async function GET() {
  try {
    const client = await db.connect();
    const { rows } = await client.sql`SELECT 
                                 ent.id,
                                 ent.vehicle_text,
                                 ent.plate, 
                                 ent.color,
                                 pkl.description AS parking_location,
                                 sts.description AS status,
                                 ent.entry_date
                               FROM t_entries ent
                               INNER JOIN t_status sts 
                                ON sts.status = ent.status
                               LEFT JOIN t_parking_location pkl
                                ON pkl.id = ent.parking_location_id`;

    return NextResponse.json({ entries: rows });
  } catch (error) {
    console.error('Error while getting entries:', error);

    return NextResponse.json({ error: "Error while getting entries" }, { status: 500 }); 
  }
}