'use server'; 

import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

 
export async function GET() {
  const client = await db.connect();
  try {
    const { rows } = await client.sql`SELECT 
                                        ent.id,
                                        ent.plate, 
                                        ent.color,
                                        ent.status,
                                        sts.description AS status_description,
                                        CAST(date_trunc('second', ent.entry_date) AS TEXT) AS entry_date,
                                        CAST(date_trunc('second', ent.exit_date) AS TEXT) AS exit_date,
                                        CAST(date_trunc('second', COALESCE(ent.exit_date, NOW()) - ent.entry_date) AS TEXT) AS duration       
                                      FROM t_entries ent
                                      INNER JOIN t_status sts 
                                       ON sts.status = ent.status
                                      ORDER BY ent.entry_date DESC`;    

    return NextResponse.json({ entries: rows });
  } catch (error) {
    console.error('Error while getting entries:', error);
    return NextResponse.json({ error: "Error while getting entries" }, { status: 500 }); 
  } finally {
    client.release();
  }
}