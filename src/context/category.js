import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [updatingCategory, setUpdatingCategory] = useState(null);

  const createCategory = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });

      if (response.ok) {
        toast.success("Categoria criada com sucesso");
        const newlyCreatedCategory = await response.json();
        setName("");
        setCategories({newlyCreatedCategory, ...categories});
      } else {
        const errorData = await response.json();
        toast.error(errorData.err); 
      }
    } catch (err) {
      console.log("err => ", err);
      toast.error("An error ocurred while creating the category");
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.API}/category`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.log("err => ", err);
      toast.error("An error ocurred while fetching the categories");
    }
  }

  const updateCategory = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category/${updatingCategory._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatingCategory),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedCategory = await response.json();

      setCategories((prevCategories) => prevCategories.map((c) => c._id === updatingCategory._id ? updatedCategory : c));

      setUpdatingCategory(null);

      toast.success("Categoria atualizada com sucesso");
    } catch (err) {
      console.log("err => ", err);
      toast.error("An error ocurred while updating the category");
    }
  }

  const deleteCategory = async () => {
    try {
      
    } catch (err) {
      console.log("err => ", err);
      toast.error("An error ocurred while deleting the category");
    }
  }

  return (
    <CategoryContext.Provider
      value={{
        name,
        setName,
        createCategory,
        categories,
        setCategories,
        fetchCategories,
        updateCategory,
        setUpdatingCategory,
        updatingCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);