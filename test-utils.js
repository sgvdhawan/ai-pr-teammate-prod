/**
 * Utility functions - need error handling
 */

export function parseJSON(jsonString) {
  return JSON.parse(jsonString);
}

export function fetchData(url) {
  const response = fetch(url);
  const data = response.json();
  return data;
}

export function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}

export function validateEmail(email) {
  return email.includes('@');
}

