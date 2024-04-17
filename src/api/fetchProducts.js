const fetchProducts = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        console.log('Products Data:', data);
        return data; // If you want to use the data elsewhere
    } catch (error) {
        console.error('Error Fetching Products Data:', error);
        throw error; // Re-throw the error to handle it further up the call stack if needed
    }
};

export default fetchProducts;
