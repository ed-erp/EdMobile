import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { homeService } from '../services/homeService';

export const fetchHomeData = createAsyncThunk(
  'home/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      return await homeService.fetchHomeItems();
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Error fetching data');
    }
  }
);

type HomeItem = {
  // Define the properties of HomeItem here, for example:
  // id: number;
  // title: string;
  // Add other fields as per your HomeItem structure
};

interface HomeState {
  data: HomeItem[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  data: [],
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchHomeData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default homeSlice.reducer;
