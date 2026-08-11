const itemsUrl = "http://127.0.0.1:3003/items";
const demoItemsUrl = `${itemsUrl}?app=boon-demo`;

async function createDemoItem() {
  const response = await fetch(itemsUrl, {
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

  const item = await response.json();
  console.log("CREATE status:", response.status);
  console.log(item);
  return item;
}

async function readDemoItems(label: string) {
  const response = await fetch(demoItemsUrl);
  const items = await response.json();
  console.log(label, response.status);
  console.log(items);
  return items;
}

async function updateDemoItem(id: string) {
  const response = await fetch(`${itemsUrl}/${id}`, {
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

  const item = await response.json();
  console.log("UPDATE status:", response.status);
  console.log(item);
}

async function deleteDemoItem(id: string) {
  const response = await fetch(`${itemsUrl}/${id}`, { method: "DELETE" });
  const item = await response.json();
  console.log("DELETE status:", response.status);
  console.log(item);
}

async function demo() {
  const createdItem = await createDemoItem();
  const itemsAfterCreate = await readDemoItems("DB status after create:");
  console.log("DB items after create:", itemsAfterCreate.length);
  await readDemoItems("READ status:");
  await updateDemoItem(createdItem.id);
  await deleteDemoItem(createdItem.id);
  const finalItems = await readDemoItems("FINAL DB status:");
  console.log("ITEMS IN DB:", finalItems.length);
  console.log("FINAL ITEMS IN DB:", finalItems);
}

demo();
