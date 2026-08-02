import type { Request, Response } from "express";
import database from "../database";
import type { entityType } from "../entityType";

export function deleteItem(request: Request, response: Response): void {
  const existing = database
    .prepare(
      `SELECT id, app, content, created_at, updated_at
       FROM Entities
       WHERE id = ?`,
    )
    .get(request.params.id) as entityType | undefined;

  if (!existing) {
    response.status(404).json({ error: "Item not found" });
    return;
  }

  database.prepare("DELETE FROM Entities WHERE id = ?").run(existing.id);

  response.status(200).json({
    id: existing.id,
    app: existing.app,
    content: JSON.parse(existing.content),
    createdAt: existing.created_at,
    updatedAt: existing.updated_at,
  });
}
