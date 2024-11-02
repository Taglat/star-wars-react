import { IStarship } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface spaceshipsState {
  data: IStarship[];
  loading: boolean;
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: spaceshipsState = {
  data: [],
  loading: false,
  page: 1,
  totalPages: 0,
  error: null,
};

export const fetchSpaceships = createAsyncThunk(
  "spaceships/fetchSpaceships",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}starships/?page=${page}`);
      return {
        data: response.data.results,
        totalPages: Math.ceil(response.data.count / 10),
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const spaceshipsSlice = createSlice({
  name: "spaceships",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpaceships.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpaceships.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchSpaceships.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage } = spaceshipsSlice.actions;
export default spaceshipsSlice.reducer;
