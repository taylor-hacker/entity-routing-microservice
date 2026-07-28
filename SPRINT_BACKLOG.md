# Sprint Backlog: Notes Routing Microservice

**Teammates:** Gavin, Josh
**Repository:** [notes-routing-microservice](https://github.com/taylor-hacker/notes-routing-microservice)

## Story 1 — Route a note to a destination

**As a** developer integrating the microservice, **I want** an item to have a
destination identifier **so that** the note is routed to the correct user,
profile, item, project, or other application resource.

Example destination: `project/{projectId}/subproject/{subprojectId}/note/{noteId}`

### Acceptance criteria

#### Functional

- Given that a note is created successfully, when the microservice responds,
  then the response includes a unique note ID, its destination, its status, and
  its creation timestamp.

#### Quality attributes / non-functional

- **Reliability:** A successfully created note remains available after the
  microservice restarts.
- **Data integrity:** Each saved note has a unique identifier and is associated
  with exactly one destination.

## Story 2 — Retrieve routed notes

**As a** developer using the microservice, **I want** to request items for a
specific route **so that** my program can display or process only the items for
that destination.

### Acceptance criteria

#### Functional

- Given that notes are returned successfully, when the client receives the
  response, then the notes are ordered from newest to oldest by default.
- Given that one or more notes exist for a destination, when the client sends a
  GET request containing that destination ID, then the microservice returns the
  notes assigned to that destination.

#### Quality attributes / non-functional

- **Usability:** Responses use a JSON structure.
- **Security:** A request for one destination never returns notes assigned to a
  different destination; notes route correctly.

## Story 3 — Re-route an item

**As a** developer using the microservice, **I want** to change the destination
of an existing item **so that** an item routed to the wrong location can be
routed to the correct destination.

### Acceptance criteria

#### Functional

- Given that an item is successfully re-routed, when the new destination
  requests its items, then the note appears in the new destination's results.
- Given that an item is successfully re-routed, when the original destination
  requests its items, then the note does not appear.

#### Quality attributes / non-functional

- **Reliability:** The destination update is saved permanently and remains
  correct after the microservice restarts.
- **Security:** Only an authorized client is allowed to change a note's
  destination.
