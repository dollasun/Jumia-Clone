import { api } from '../api';
import { Product, ProductResponse } from './product-type';

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, { limit?: number; skip?: number; category?: string }>({
      query: ({ limit = 20, skip = 0, category } = {}) => {
        if (category) {
          return `products/category/${category}?limit=${limit}&skip=${skip}`;
        }
        return `products?limit=${limit}&skip=${skip}`;
      },
      providesTags: ['Product'],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    searchProducts: builder.query<ProductResponse, string>({
      query: (q) => `products/search?q=${q}`,
      providesTags: ['Product'],
    }),
    getCategories: builder.query<string[], void>({
      query: () => 'products/categories',
      providesTags: ['Category'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
  useGetCategoriesQuery,
} = productApi;
