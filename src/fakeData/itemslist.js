export const items = new Array(10000).fill(true).map((val, id) => ({
    id: id,
    item_title: Math.random().toString(20).substring(8),
    item_describtion: Math.random().toString(20).substring(8),
    item_number: Math.ceil(Math.random() * 80)
  }))