import { IPlanet } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface PlanetsState {
  data: IPlanet[];
  loadedPages: number[];
  loading: boolean;
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: PlanetsState = {
  data: [],
  loadedPages: [],
  loading: false,
  page: 1,
  totalPages: 0,
  error: null,
};

const loadLocalStorageData = (): IPlanet[] => {
  const storedData = localStorage.getItem("planets");
  return storedData ? JSON.parse(storedData) : [];
};

const initialLocalData = loadLocalStorageData();

export const fetchPlanets = createAsyncThunk(
  "planets/fetchPlanets",
  async (page: number, { getState, rejectWithValue }) => {
    const state = getState() as { planets: PlanetsState };

    if (state.planets.loadedPages.includes(page)) {
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
  initialState: {
    ...initialState,
    data: initialLocalData,
  },
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    updatePlanet: (state, action: PayloadAction<IPlanet>) => {
      const index = state.data.findIndex((planet) => planet.url === action.payload.url);
      if (index !== -1) {
        state.data[index] = action.payload;
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
        console.log('fetchPlanets.pending')
      })
      .addCase(fetchPlanets.fulfilled, (state, action) => {
        console.log('fetchPlanets.fulfilled')

        state.loading = false;
        if (action.payload) {
          const { data, page, totalPages } = action.payload;

          const uniqueData = data.filter(
            (newPlanet:Partial<IPlanet>) => !state.data.some((existingPlanet) => existingPlanet.url === newPlanet.url)
          );

          state.data = [...state.data, ...uniqueData];
          state.loadedPages.push(page);
          state.totalPages = totalPages;

          localStorage.setItem("planets", JSON.stringify(state.data));
        }
      })
      .addCase(fetchPlanets.rejected, (state, action) => {
        console.log('fetchPlanets.rejected')
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage, updatePlanet } = planetsSlice.actions;
export default planetsSlice.reducer;
