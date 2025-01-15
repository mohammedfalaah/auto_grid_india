import { createContext } from "react";
import Axioscall from "./Axioscall";
import { getCartlistApi, getCategoryApi, getWishlistApi, productApi } from "./BaseUrl";
import { useState,useEffect } from "react";
import { show_toast } from "../utils/Toast";

export const ContextData = createContext();

export const Context_Provider = ({ children }) => {
  const [product, setProduct] = useState([])
  const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
  const [product2, setProduct2] = useState([])
const [loading, setLoading] = useState(false);
const [pages, setPages] = useState({
    page: 1,
    limit: 15,
  });
    const [pagination, setPagination] = useState({
      isNext: false,
      isPrev: false,
    });
  const [length, setLenght] = useState()
  const [wishlistLength, setWishlistLength] = useState()
const [totalProducts, setTotalProducts] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
    const getFavouriteContext = async () => {
      try {
        const response = await Axioscall("get", getWishlistApi, "", "header");
        console.log(response);
        console.log(response?.data?.wishlistedProducts?.length);
        setWishlistLength(response?.data?.wishlistedProducts?.length)
        setProduct2(response.data.wishlistedProducts)
        if(response.data.message){
          show_toast("Wishlist Added Successfully", true)
        } 
      } catch (error) {
       console.log();("Error fetching wishlist", false);
      }
    };

  const getCart = async () => {
    try {
      const response = await Axioscall("get",getCartlistApi,"","header")
      console.log(response);
      console.log(response?.data?.products?.length)
      setLenght(response?.data?.products?.length)
       setProduct(response.data.products);
       if(response.data.message){
        show_toast("Cart Added Successfully", true)
       } 
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
    getFavouriteContext();
  }, []);

  const getCategory = async () => {
    try {
      const response = await Axioscall("get", getCategoryApi, "", "header");
      console.log("==========getCategoryApigetCategoryApi=", response);

      if (response?.data) {
        setCategories(response.data);
      } else {
        show_toast("Failed to fetch categories!", false);
      }
    } catch (error) {
      console.error(error);
      show_toast("Error fetching categories!", false);
    }
  };
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Construct the query string
        const subcategoryQuery = selectedCategory
          ? `&subcategory=${selectedCategory}`
          : "";
  
        const response = await Axioscall(
          "get",
          `${productApi}?page=${pages.page}&limit=${pages.limit}${subcategoryQuery}`,
          "",
          "header"
        );
        setLoading(false);
        console.log("PRODUCTS", response);
  
        setProducts(response.data.products);
        setTotalProducts(response.data.pagination.totalProducts);
  
        const { hasNextPage, hasPreviousPage } = response.data.pagination;
        setPagination({
          isNext: hasNextPage,
          isPrev: hasPreviousPage,
        });
      } catch (err) {
        show_toast(err.response?.data?.message || err.message);
      }
    };
  useEffect(() => {
      fetchProducts();
      getCategory();
    }, [pages]);
  
    const handleCategoryClick = (categoryId) => {
      console.log(categoryId,"categoryIdcategoryIdcategoryIdcategoryIdcategoryId")
      setSelectedCategory(categoryId); // Set the selected category
      setPages({ ...pages, page: 1 }); // Reset to the first page
      fetchProducts(); // Fetch products with the selected category
    };
  
    // Fetch products on page or category change
    useEffect(() => {
      fetchProducts();
    }, [pages.page, pages.limit]);
  return (
    <ContextData.Provider value={{ isValid,getCart,length,getFavouriteContext,wishlistLength,categories ,products,handleCategoryClick,totalProducts,loading}}>
      {children}
    </ContextData.Provider>
  );
};

export default Context_Provider;
