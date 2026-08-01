# entity-routing-microservice

The Plan for this microservice is to use four HTTP requests which trigger functions that then update a SQLite DB. 

This microservice evolved from a specific notes routing microservice into a more generic CRUD entity routing microservice that connects a SQLite DB to a to backend via Express and HTTP requests. 

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

async function createItem() {
  const response = await fetch("http://127.0.0.1:3003/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      app: "boon",
      content: {
        title: "Study for CS 361",
        body: "Review UML sequence diagrams"
      }
    })
  });

  const item = await response.json();

  console.log("Status:", response.status);
  console.log("Received item:", item);
}

createItem().catch(console.error);

#### response:

{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "app": "boon",
  "content": {
    "clue-profile": "Mom (or a uuid)",
    "clue-body": "Mom likes the Ceylong black tea from David's Tea"
  },
  "createdAt": "2026-08-01T22:30:00.000Z",
  "updatedAt": "2026-08-01T22:30:00.000Z"
}

Similar examples would hold for getItem(), updateItem(), and DeleteItem(), 




PLACEHOLDER FOR UML.