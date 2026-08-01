import type { Request, Response } from "express";
import database from "../database";
import type { entityType } from "../entityType";

export function updateItem(request: Request, response: Response): void {
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

  const { app = existing.app, content = JSON.parse(existing.content) } =
    request.body;
  const updatedAt = new Date().toISOString();

  database
    .prepare(
      `UPDATE Entities
       SET app = ?, content = ?, updated_at = ?
       WHERE id = ?`,
    )
    .run(app, JSON.stringify(content), updatedAt, existing.id);

  response.status(200).json({
    id: existing.id,
    app,
    content,
    createdAt: existing.created_at,
    updatedAt,
  });
}
