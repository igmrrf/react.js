export const updateItem = (item_list: any[], itemToUpdate: any) => {
  const item = item_list.find((item) => item.id === itemToUpdate.id);
  item_list[item_list.indexOf(item)] = itemToUpdate;
  return item_list;
};

export const addNewItem = (itemList: any[], itemToAdd: any): any[] => {
  itemList.push(itemToAdd);
  return itemList;
};

export const deleteItem = (itemList: any[], itemToDelete: any) => {
  return itemList.filter((item) => item.id !== itemToDelete.id);
};
