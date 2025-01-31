// import React, { useState, useEffect, useRef,useContext } from 'react';
// import { Search } from 'lucide-react';
// import { useDebounce } from '../hook/useDebounce'; 
// // import { searchProducts } from '../api/products';
// import { ContextData } from '../services/Context';

// export function SearchBar({ onSearch, placeholder = "Search products..." }) {
//   const [query, setQuery] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [results, setResults] = useState([]);
//   const [showResults, setShowResults] = useState(false);
//   const debouncedQuery = useDebounce(query, 300);
//   const wrapperRef = useRef(null);
//   const { products,fetchProducts} = useContext(ContextData);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         setShowResults(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const fetchResults = async () => {
//       if (debouncedQuery.length < 2) {
//         setResults([]);
//         return;
//       }

//       setIsLoading(true);
//       try {
//         const products = await searchProducts(debouncedQuery);
//         setResults(products);
//         setShowResults(true);
//       } catch (error) {
//         console.error('Error fetching results:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchResults();
//   }, [debouncedQuery]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch(query);
//     setShowResults(false);
//   };

//   const handleResultClick = (product) => {
//     setQuery(product.name);
//     onSearch(product.name);
//     setShowResults(false);
//   };

//   return (
//     <div ref={wrapperRef} className="w-full max-w-2xl relative">
//       <form onSubmit={handleSubmit}>
//         <div className="relative">
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onFocus={() => setShowResults(true)}
//             placeholder={placeholder}
//             className="w-full px-4 py-2 pl-10 pr-12 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//             <Search className="w-5 h-5 text-gray-400" />
//           </div>
//           <button
//             type="submit"
//             className="absolute inset-y-0 right-0 flex items-center px-4 text-sm font-medium text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {isLoading ? (
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             ) : (
//               'Search'
//             )}
//           </button>
//         </div>
//       </form>

//       {showResults && results.length > 0 && (
//         <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
//           {results.map((product) => (
//             <div
//               key={product.id}
//               onClick={() => handleResultClick(product)}
//               className="flex items-center p-3 hover:bg-gray-50 cursor-pointer transition-colors"
//             >
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-12 h-12 object-cover rounded"
//               />
//               <div className="ml-3">
//                 <p className="text-sm font-medium text-gray-900">{product.name}</p>
//                 <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect, useRef ,useContext} from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '../hook/useDebounce';
// import { searchProducts } from '../api/products';
import { ContextData } from '../services/Context';
export function SearchBar({ onSearch, placeholder = "Search products...", category = '',onClick }) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const wrapperRef = useRef(null);
  const { products,fetchProducts} = useContext(ContextData);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetchProducts(debouncedQuery, page, 10, category);
        console.log(response,"responseresponseresponseresponseresponseresponseresponse")
        setResults(response.products);
        setHasMore(response.pagination.hasNextPage);
        setShowResults(true);
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, page, category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setShowResults(false);
  };

  const handleResultClick = (product) => {
    setQuery(product.productName);
    onSearch(product.productName);
    setShowResults(false);
  };

  const loadMore = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div ref={wrapperRef} className="w-full max-w-2xl relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowResults(true)}
            placeholder={placeholder}
            className="w-full px-4 py-2 pl-10 pr-12 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div> */}
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center px-4 text-sm font-medium text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {/* {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Search'
            )} */}
          </button>
        </div>
      </form>

      {showResults && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto" onClick={onClick}>
          {results.map((product) => (
            // <div
            //   key={product.id}
            //   onClick={() => handleResultClick(product)}
            //   className="flex items-center p-3 hover:bg-gray-50 cursor-pointer transition-colors"
            // >
            //   <img
            //    src={`https://node.autogridnumberplate.com${
            //     product.photographs?.[0] || ""
            //   }`}
            //     alt={product?.productName}
            //     // className="w-2 h-2 object-cover rounded"
            //     style={{
            //         width: "auto",
            //         height: "38px",
            //         maxWidth: "100%",
            //         objectFit: "contain",
            //         borderRadius: "6px",
            //       }}
            //   />
            //   <div className="ml-3">
            //     <p className="text-sm font-medium text-gray-900">{product?.productName}</p>
            //     <span
            //                               style={{ paddingRight: "10px" }}
            //                               className="tp-product-price-2 new-price"
            //                             >
            //                               ₹{product?.currentPrice ?? ""}
            //                             </span>
            //                             <span className="tp-product-price-2 old-price">
            //                               ₹{product?.originalPrice}
            //                             </span>
            //     {/* <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p> */}
            //   </div>
            // </div>
            <div
            key={product.id}
            onClick={() => handleResultClick(product)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              hover: { backgroundColor: '#f9fafb' },
            }}
          >
            {/* Image */}
            <img
              src={`https://node.autogridnumberplate.com${product.photographs?.[0] || ""}`}
              alt={product?.productName}
              style={{
                width: 'auto',
                height: '38px',
                maxWidth: '100%',
                objectFit: 'contain',
                borderRadius: '6px',
              }}
            />
          
            {/* Name and Price in the same row */}
            <div
              style={{
                marginLeft: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
              }}
            >
              {/* Product Name */}
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#1f2937',
                }}
              >
                {product?.productName}
              </p>
          
              {/* Price Section */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span
                  style={{
                    fontWeight: '600',
                    color: '#1f2937',
                  }}
                >
                  ₹{product?.currentPrice ?? ""}
                </span>
                <span
                  style={{
                    textDecoration: 'line-through',
                    color: '#6b7280',
                  }}
                >
                  ₹{product?.originalPrice}
                </span>
              </div>
            </div>
          </div>
          
          
          

          ))}
          {hasMore && (
            <button
              onClick={loadMore}
              className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 font-medium text-center border-t"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}