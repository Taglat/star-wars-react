import { IPlanet } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface PlanetsState {
  data: { [page: number]: IPlanet[] };
  loadedPages: number[];
  loading: boolean;
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: PlanetsState = {
  data: {},
  loadedPages: [],
  loading: false,
  page: 1,
  totalPages: 0,
  error: null,
};

export const fetchPlanets = createAsyncThunk(
  "planets/fetchPlanets",
  async (page: number, { getState, rejectWithValue }) => {
    const state = getState() as { planets: PlanetsState };

    if (state.planets.data[page]) {
      return null;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API}planets/?page=${page}`);
      return {
        data: response.data.results,
        page,
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
    updatePlanet: (state, action: PayloadAction<IPlanet>) => {
      const pageEntries = Object.entries(state.data);
      for (let [, planets] of pageEntries) {
        const index = planets.findIndex((char) => char.url === action.payload.url);
        if (index !== -1) {
          planets[index] = action.payload;
          localStorage.setItem("planets", JSON.stringify(state.data));
          break;
        }
      }
      localStorage.setItem("planets", JSON.stringify(state.data));
      alert("Сохранено")
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
        if (action.payload) {
          const { data, page, totalPages } = action.payload;

          state.data[page] = data;
          state.totalPages = totalPages;

          localStorage.setItem("planets", JSON.stringify(state.data));
        }
      })
      .addCase(fetchPlanets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage, updatePlanet } = planetsSlice.actions;
export default planetsSlice.reducer;
