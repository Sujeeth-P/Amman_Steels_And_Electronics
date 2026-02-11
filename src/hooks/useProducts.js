import { useState, useEffect } from 'react';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

/**
 * Custom hook to fetch all products or filtered products
 * @param {Object} filters - Optional filters { category, inStock, search }
 * @returns {Object} { products, loading, error, refetch }
 */
export const useProducts = (filters = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            // Build query string
            const queryParams = new URLSearchParams();
            if (filters.category) queryParams.append('category', filters.category);
            if (filters.inStock !== undefined) queryParams.append('inStock', filters.inStock);
            if (filters.search) queryParams.append('search', filters.search);

            const url = `${API_BASE_URL}/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                setProducts(data.data);
            } else {
                setError(data.message || 'Failed to fetch products');
            }
        } catch (err) {
            setError('Unable to connect to server');
            console.error('Fetch products error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [filters.category, filters.inStock, filters.search]);

    return { products, loading, error, refetch: fetchProducts };
};

/**
 * Custom hook to fetch a single product by ID
 * @param {string} productId - Product ID
 * @returns {Object} { product, loading, error, refetch }
 */
export const useProduct = (productId) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProduct = async () => {
        if (!productId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${API_BASE_URL}/products/${productId}`);
            const data = await response.json();

            if (data.success) {
                setProduct(data.data);
            } else {
                setError(data.message || 'Product not found');
            }
        } catch (err) {
            setError('Unable to connect to server');
            console.error('Fetch product error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    return { product, loading, error, refetch: fetchProduct };
};

/**
 * Helper function to get categories
 * @returns {Promise<Array>} Array of category names
 */
export const getCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/categories/list`);
        const data = await response.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error('Get categories error:', error);
        return [];
    }
};
