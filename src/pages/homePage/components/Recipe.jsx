import { useContext } from "react";
import styles from "./Recipe.module.scss";
import { ApiContext } from "../../../Context/ApiContext";

function Recipe({ recipe: { title, _id, liked, image }, toggleLikerecipe }) {
  const BASE_URL = useContext(ApiContext);
  async function handleLiked() {
    try {
      const response = await fetch(`${BASE_URL}/${_id}`, {
        method: "PATCH",
        body: JSON.stringify({
          liked: !liked,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const recipe = await response.json();
        toggleLikerecipe(recipe);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div onClick={handleLiked} className={styles.recipe}>
      <div className={styles.imageContainer}>
        <img src={image} alt="recipe" />
      </div>
      <div
        className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb-10">{title}</h3>
        <i className={`fa-solid fa-heart ${liked ? "text-primary" : ""}`}></i>
      </div>
    </div>
  );
}

export default Recipe;
