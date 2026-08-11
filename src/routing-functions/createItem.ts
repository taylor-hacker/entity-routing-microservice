import { randomUUID } from "node:crypto";
import type { Request, Response } from "express";
import database from "../database";

export function createItem(request: Request, response: Response): void {
  const id = randomUUID();
  const now = new Date().toISOString();
  const { app, content } = request.body;

  database
    .prepare(
      "INSERT INTO Entities (id, app, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
    )
    .run(id, app, JSON.stringify(content), now, now);

  response.status(201).json({
    id,
    app,
    content,
    createdAt: now,
    updatedAt: now,
  });
}
