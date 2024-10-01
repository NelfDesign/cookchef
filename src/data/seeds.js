import { data } from "./recipes";

export async function seedRecipes() {
  try {
    await fetch("https://restapi.fr/api/recipes", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
