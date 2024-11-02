import { IPlanet } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface PlanetsState {
  data: IPlanet[];
  loading: boolean;
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: PlanetsState = {
  data: [],
  loading: false,
  page: 1,
  totalPages: 0,
  error: null,
};

export const fetchPlanets = createAsyncThunk(
  "planets/fetchPlanets",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}planets/?page=${page}`);
      return {
        data: response.data.results,
        totalPages: Math.ceil(response.data.count / 10),
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const planetsSlice = createSlice({
  name: "planets",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlanets.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPlanets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage } = planetsSlice.actions;
export default planetsSlice.reducer;
