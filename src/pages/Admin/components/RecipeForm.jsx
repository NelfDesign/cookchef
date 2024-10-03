import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./RecipeForm.module.scss";
import { useContext } from "react";
import { ApiContext } from "../../../Context/ApiContext";

function RecipeForm() {
  const BASE_URL = useContext(ApiContext);

  const defaultValues = {
    title: "",
    image: "",
  };

  //gestion des erreurs avec YUP
  const recipeSchema = yup.object({
    title: yup
      .string()
      .required("Le titre de la recette doit être renseigné")
      .min(10, "Le titre doit être explicite")
      .max(30, "Le titre doit être succinct"),
    image: yup
      .string()
      .url("L'image doit être un lien valide")
      .required("Il faut renseigner une image"),
  });

  //library useForm qui gére les formulaires de façon très simple
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    setError,
    reset,
    clearErrors,
  } = useForm({ defaultValues, resolver: yupResolver(recipeSchema) });

  async function submit(values) {
    try {
      clearErrors();
      const response = await fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        reset(defaultValues);
      } else {
        setError("generic", {
          type: "generic",
          message: "Il y a eu une erreur",
        });
      }
    } catch (error) {
      setError("generic", { type: "generic", message: error });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`d-flex flex-column card p-20 ${styles.recipeForm}`}
    >
      <h2 className="mb-20">Ajouter une recette</h2>
      <div className="d-flex flex-column mb-20">
        <label>Titre de la recette</label>
        <input {...register("title")} type="text" />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>
      <div className="d-flex flex-column mb-20">
        <label>Image pour la recette</label>
        <input {...register("image")} type="text" />
        {errors.image && <p className="form-error">{errors.image.message}</p>}
      </div>
      {errors.generic && <p className="form-error">{errors.generic.message}</p>}
      <div>
        <button disabled={isSubmitting} className="btn btn-primary">
          Sauvegarder
        </button>
      </div>
    </form>
  );
}

export default RecipeForm;
