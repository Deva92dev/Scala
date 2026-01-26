export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Electronics: ["Mouse", "Keyboard", "Computer", "Phone", "Monitor"],
  Furniture: ["Chair", "Table", "Bed", "Sofa"],
  Apparel: ["Shirt", "Pants", "Shoes", "Hat", "Gloves"],
  Food: [
    "Chicken",
    "Fish",
    "Tuna",
    "Bacon",
    "Sausages",
    "Pizza",
    "Salad",
    "Cheese",
    "Chips",
  ],
  Home: ["Soap", "Towels", "Ball"],
  Transport: ["Bike", "Car"],
};

export const AVAILABLE_CATEGORIES = Object.keys(CATEGORY_KEYWORDS);
