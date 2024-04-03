import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Transaction {
  _id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
}

interface TransactionsState {
  transactions: Transaction[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TransactionsState = {
  transactions: [],
  status: 'idle',
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    try {
      const res = await fetch("http://localhost:3000/api/transactions", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload.transactions;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch transactions';
      });
  },
});

export default transactionsSlice.reducer;
