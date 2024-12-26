import { createContext } from "react";

export const ContextData = createContext();

export const Context_Provider = ({ children }) => {

    
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

  return (
    <ContextData.Provider value={{ isValid }}>
      {children}
    </ContextData.Provider>
  );
};

export default Context_Provider;
