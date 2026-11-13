import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../utils/api.js';

export const fetchOverview = createAsyncThunk('commerce/fetchOverview', () => api('/overview'));
export const fetchProducts = createAsyncThunk('commerce/fetchProducts', () => api('/products'));
export const fetchOrders = createAsyncThunk('commerce/fetchOrders', () => api('/orders'));

export const addProduct = createAsyncThunk('commerce/addProduct', product =>
  api('/products', { method: 'POST', body: JSON.stringify(product) })
);
export const updateProduct = createAsyncThunk('commerce/updateProduct', ({ id, ...product }) =>
  api(`/products/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(product) })
);
export const deleteProduct = createAsyncThunk('commerce/deleteProduct', async id => {
  await api(`/products/${encodeURIComponent(id)}`, { method: 'DELETE' });
  return id;
});
export const updateOrderStatus = createAsyncThunk('commerce/updateOrderStatus', ({ id, status }) =>
  api(`/orders/${encodeURIComponent(id)}/status`, {
    method: 'PATCH', body: JSON.stringify({ status }),
  })
);

const slice = createSlice({
  name: 'commerce',
  initialState: {
    overview: null,
    products: [],
    orders: [],
    loading: true,
    error: null,
  },
  reducers: { clearError(state) { state.error = null; } },
  extraReducers(builder) {
    builder
      .addCase(fetchOverview.fulfilled, (state, action) => { state.overview = action.payload; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.products = action.payload; })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.orders = action.payload; })
      .addCase(addProduct.fulfilled, (state, action) => { state.products.push(action.payload); })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload);
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o.id === action.payload.id);
        if (index !== -1) state.orders[index] = action.payload;
      })
      .addMatcher(action => [fetchOverview, fetchProducts, fetchOrders].some(t => action.type === t.pending.type),
        state => { state.loading = true; state.error = null; })
      .addMatcher(action => [fetchOverview, fetchProducts, fetchOrders].some(t => action.type === t.fulfilled.type),
        state => { state.loading = false; })
      .addMatcher(action => action.type.startsWith('commerce/') && action.type.endsWith('/rejected'),
        (state, action) => { state.loading = false; state.error = action.error.message || 'Something went wrong'; });
  },
});

export const { clearError } = slice.actions;
export default slice.reducer;
