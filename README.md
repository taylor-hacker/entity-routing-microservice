# entity-routing-microservice

The Plan for this microservice is to use four HTTP requests which trigger functions that then update a SQLite DB. 

This microservice evolved from a specific notes routing microservice into a more generic CRUD Entity routing+deleting microservice that connects a betterSQLite 3 DB to a to backend using Typescript, express, Node, and HTTP requests. 

POST   /items
    Returns 201 or error
GET    /items?app=boon (or whatever app...)
    Returns 200 or error
PATCH  /items/:id
    Returns 200 or error
DELETE /items/:id
    Returns 200 or error

{
  "error": "Item not found"
}

The way the routing will work is via express sending HTTP requests across a shared generic json structure. The structure is as follows: 

{
  "id": uuid",
  "app": one of the five potential apps" 
  "Content": {
    "title": "Flexible item structure",
    "body": "Contents belongs to the microservice, but the specifics can be anyhting inside this object depending on need"
  },
  "createdAt": "xxxxxxxx",
  "updatedAt": "yyyyyyyyy"
}

The program generates app and content, the microservice generates id, createdAt, and UpdatedAt. 

Generic SQLite Schema 

CREATE TABLE Entities (
  id TEXT PRIMARY KEY,
  app TEXT NOT NULl, 
  Content TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

## Example:


```ts
app.post("/items", createItem);
```

```ts
export function createItem(request: Request, response: Response): void {
  const id = randomUUID();
  const now = new Date().toISOString();
  const { app, content } = request.body;

  database
    .prepare("INSERT INTO Entities (id, app, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?)")
    .run(id, app, JSON.stringify(content), now, now);

  response.status(201).json({
    id,
    app,
    content,
    createdAt: now,
    updatedAt: now,
  });
}
```

#### response:

```json
{
  "id": "sample uuid",
  "app": "boon",
  "content": {
    "title": "title",
    "body": "content "
  },
  "createdAt": "2026-08-01 5:47pm",
  "updatedAt": "2026-08-01 6:13pm"
}
```

Similar examples would hold for getItem(), updateItem(), and DeleteItem(),

## Demo:

// demo.ts is a simple test program for the entity routing microservice.
// Run the server first with: npm run dev
// this instantiates the database and the server with the requisite routing functions
// Then, in a second terminal instance, run this file with: npm run demo
// this calls the functions and tests each function of the microservice with a sample database item
// It creates a json item, reads it then updates it, then deletes it, then finally checks the DB status.



PLACEHOLDER FOR UML.
