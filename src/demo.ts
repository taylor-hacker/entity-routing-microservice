// This file is a simple test program for the routing microservice.
// Run the server first with: npm run dev
// this instantiates the database and the server with the requisite routing functions
// Then run this file with: npm run demo
// this calls the functions and tests each function of the microservice with a sample database item
// It creates a json item, reads it then updates it, then deletes it, then finally checks the DB status.

async function demo() {

  //create an item 
  console.log("CREATE ITEM TEST");
  const createResponse = await fetch("http://127.0.0.1:3003/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      app: "boon-demo",
      content: {
        title: "Demo item",
        body: "This item was created by demo.ts",
      },
    }),
  });

  const createdItem = await createResponse.json();
  console.log("CREATE status:", createResponse.status);
  console.log(createdItem);

  //db test after creating item
  console.log("");

  console.log("DB STATUS AFTER CREATE");
  const createDbResponse = await fetch("http://127.0.0.1:3003/items?app=boon-demo");
  const createDbItems = await createDbResponse.json();

  console.log("DB status:", createDbResponse.status);
  console.log("DB items after create:", createDbItems.length);
  console.log("");

  //read items test
  console.log("READ ITEMS TEST");
  const readResponse = await fetch("http://127.0.0.1:3003/items?app=boon-demo");
  const readItems = await readResponse.json();
  console.log("READ status:", readResponse.status);
  console.log(readItems);


  //update item test
  console.log("UPDATE ITEM TEST");
  const updateResponse = await fetch(`http://127.0.0.1:3003/items/${createdItem.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: {
        title: "Updated demo item",
        body: "This item was updated by demo.ts",
      },
    }),
  });

  const updatedItem = await updateResponse.json();
  console.log("UPDATE status:", updateResponse.status);
  console.log(updatedItem);
  console.log("");


  //delete item test
  console.log("DELETE TEST");
  const deleteResponse = await fetch(`http://127.0.0.1:3003/items/${createdItem.id}`, {
    method: "DELETE",
  });

  const deletedItem = await deleteResponse.json();
  console.log("DELETE status:", deleteResponse.status);
  console.log(deletedItem);
  console.log("");
  console.log("FINAL DB STATUS TEST");

  //final db status test after deleting item
  const finalReadResponse = await fetch("http://127.0.0.1:3003/items?app=boon-demo");
  const finalReadItems = await finalReadResponse.json();
  console.log("STATUS:", finalReadResponse.status);
  console.log("ITEMS IN DB: ", finalReadItems.length);
  console.log("FINAL ITEMS IN DB:", finalReadItems);
}

demo();
