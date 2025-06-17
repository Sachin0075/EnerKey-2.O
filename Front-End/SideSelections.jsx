{
  // ...existing code...
  // Suppose the problematic line is something like:
  // selectedItems.includes(item.id)
  // Change it to:
  (Array.isArray(selectedItems) ? selectedItems : []).includes(item.id);
  // ...existing code...
}
