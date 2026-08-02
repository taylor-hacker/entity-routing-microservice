import type { Request, Response } from "express";
import database from "../database";
import type { entityType } from "../entityType";

export function readItems(request: Request, response: Response): void {
  const targetApp = String(request.query.app);
  const rows = database
    .prepare(
      `SELECT id, app, content, created_at, updated_at
       FROM Entities
       WHERE app = ?
       ORDER BY created_at`,
    )
    .all(targetApp) as entityType[];

  response.status(200).json(
    rows.map((row) => ({
      id: row.id,
      app: row.app,
      content: JSON.parse(row.content),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })),
  );
}
