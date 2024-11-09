'use server'; 

import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";


interface Entry {
  id: number;
  vehicleTypeID: string;
  brand: string;
  model: string;
  plate: string;
  color: string;
  entryDate: string;
}

 
export async function GET() {
  const client = await db.connect();
  try {
    const { rows } = await client.sql`SELECT 
                                        ent.id,
                                        veh.vehicle_type,
                                        veh.brand,
                                        veh.model,
                                        ent.plate, 
                                        ent.color,
                                        pkl.description AS parking_location,
                                        sts.description AS status,
                                        ent.entry_date
                                      FROM t_entries ent
                                      INNER JOIN t_vehicles veh
                                        ON veh.id = ent.vehicle_id
                                      INNER JOIN t_status sts 
                                        ON sts.status = ent.status
                                      LEFT JOIN t_parking_location pkl
                                        ON pkl.id = ent.parking_location_id
                                      ORDER BY ent.entry_date DESC`;

    return NextResponse.json({ entries: rows });
  } catch (error) {
    console.error('Error while getting entries:', error);
    return NextResponse.json({ error: "Error while getting entries" }, { status: 500 }); 
  } finally {
    client.release();
  }
}

export async function POST(request: Request) {
  const client = await db.connect();
  try {
    const data: Entry = await request.json();
    const { vehicleTypeID, brand, model, plate, color, entryDate } = data;

    console.log(data);

    let vehicleId: number;

    const vehicleResult = await client.sql`
      SELECT id FROM t_vehicles WHERE brand = ${brand} AND model = ${model}
    `;

    if (vehicleResult.rows.length > 0) {
      vehicleId = vehicleResult.rows[0].id;
    } else {
      const insertResult = await client.sql`
        INSERT INTO t_vehicles (vehicle_type, brand, model)
        VALUES (${vehicleTypeID}, ${brand}, ${model})
        RETURNING id
      `;
      vehicleId = insertResult.rows[0].id;
    }
    
    await client.sql`
      INSERT INTO t_entries 
        (vehicle_id, plate, color, status, user_id, entry_date)
      VALUES 
        (${vehicleId}, ${plate}, ${color}, 'P', 1, ${entryDate})
    `;

    return NextResponse.json({ message: "Entry created successfully", vehicleId });
  } catch (error) {
    console.error('Error while creating entry:', error);
    return NextResponse.json({ error: "Error while creating entry" }, { status: 500 });
  } finally {
    client.release();
  }
}

export async function PUT(request: Request) {
  const client = await db.connect();
  try {
    const data: Entry = await request.json();
    const { id, vehicleTypeID, brand, model, plate, color } = data;

    let vehicleId: number;

    const vehicleResult = await client.sql`
      SELECT id FROM t_vehicles WHERE brand = ${brand} AND model = ${model}
    `;

    if (vehicleResult.rows.length > 0) {
      vehicleId = vehicleResult.rows[0].id;
    } else {
      const insertResult = await client.sql`
        INSERT INTO t_vehicles (vehicle_type, brand, model)
        VALUES (${vehicleTypeID}, ${brand}, ${model})
        RETURNING id
      `;
      vehicleId = insertResult.rows[0].id;
    }
    
    await client.sql`
      UPDATE t_entries 
        SET vehicle_id = ${vehicleId}, plate = ${plate}, color = ${color}
      WHERE id = ${id}
    `;

    return NextResponse.json({ message: "Entry updated successfully", vehicleId });
  } catch (error) {
    console.error('Error while updating entry:', error);
    return NextResponse.json({ error: "Error while updating entry" }, { status: 500 });
  } finally {
    client.release();
  }
}


export async function DELETE(request: Request) {
  const client = await db.connect();
  try {
    const { id } = await request.json();

    console.log('id da entrada', id)

    await client.sql`
      DELETE FROM t_entries 
      WHERE id = ${id}
    `;

    return NextResponse.json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error('Error while deleting entry:', error);
    return NextResponse.json({ error: "Error while deleting entry" }, { status: 500 });
  } finally {
    client.release();
  }
}