import { createContext } from "react";
import Axioscall from "./Axioscall";
import { getCartlistApi } from "./BaseUrl";
import { useState,useEffect } from "react";

export const ContextData = createContext();

export const Context_Provider = ({ children }) => {
  const [product, setProduct] = useState([])
  const [length, setLenght] = useState()

  const getCart = async () => {
    try {
      const response = await Axioscall("get",getCartlistApi,"","header")
      console.log(response);
      console.log(response?.data?.products?.length)
      setLenght(response?.data?.products?.length)
       setProduct(response.data.products);
        } catch (err) {
          console.log(err);        
        } 
      };
  const isValid = (event, fun_name, setstate) => {
    try {
      const form = event.currentTarget;
      event.preventDefault();
      setstate(true);
      if (form.checkValidity() === false) {
        event.stopPropagation();
        return false;
      } else {
        fun_name();
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCart(); 
  }, []);
  return (
    <ContextData.Provider value={{ isValid,getCart,length }}>
      {children}
    </ContextData.Provider>
  );
};

export default Context_Provider;
