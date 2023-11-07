import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [updatingCategory, setUpdatingCategory] = useState(null);

  const createCategory = async () => {
    try {
      
    } catch (err) {
      console.log("err => ", err);
      toast.error("An error ocurred while creating the category");
    }
  }

  const fetchCategories = async () => {
    try {
      
    } catch (err) {
      console.log("err => ", err);
      toast.error("An error ocurred while fetching the categories");
    }
  }

  const updateCategory = async () => {
    try {
      
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