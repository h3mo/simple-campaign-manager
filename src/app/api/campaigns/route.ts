import { NextResponse } from "next/server";
import db from "../../db";

export async function GET() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM campaigns", [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(NextResponse.json(rows));
    });
  });
}

export async function POST(request: Request) {
  console.log("api post called");
  const data = await request.json();
  db.run(
    "INSERT INTO campaigns (name, budget, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)",
    [data.name, data.budget, data.startDate, data.endDate, "active"]
  );
  console.log(data);
  return NextResponse.json({ message: "Campaign created", data });
}
