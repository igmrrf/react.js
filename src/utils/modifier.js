export const updateItem = (item_list, itemToUpdate) => {
  const item = item_list.find((item) => item.id === itemToUpdate.id);
  item_list[item_list.indexOf(item)] = itemToUpdate;
  return item_list;
};

export const addNewItem = (itemList, itemToAdd) => {
  itemList.push(itemToAdd);
  return itemList;
};

export const deleteItem = (itemList, itemToDelete) => {
  return itemList.filter((item) => item.id !== itemToDelete.id);
};
