import { IStarship } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface SpaceshipsState {
  data: { [page: number]: IStarship[] };
  loadedPages: number[];
  loading: boolean;
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: SpaceshipsState = {
  data: {},
  loadedPages: [],
  loading: false,
  page: 1,
  totalPages: 0,
  error: null,
};

export const fetchSpaceships = createAsyncThunk(
  "spaceships/fetchSpaceships",
  async (page: number, { getState, rejectWithValue }) => {
    const state = getState() as { spaceships: SpaceshipsState };

    if (state.spaceships.data[page]) {
      return null;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API}starships/?page=${page}`);
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

const spaceshipsSlice = createSlice({
  name: "spaceships",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    updateSpaceship: (state, action: PayloadAction<IStarship>) => {
      const pageEntries = Object.entries(state.data);
      for (let [, spaceships] of pageEntries) {
        const index = spaceships.findIndex((char) => char.url === action.payload.url);
        if (index !== -1) {
          spaceships[index] = action.payload;
          localStorage.setItem("spaceships", JSON.stringify(state.data));
          break;
        }
      }
      alert("Сохранено");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpaceships.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpaceships.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const { data, page, totalPages } = action.payload;

          state.data[page] = data;
          state.totalPages = totalPages;

          localStorage.setItem("spaceships", JSON.stringify(state.data));
        }
      })
      .addCase(fetchSpaceships.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage, updateSpaceship } = spaceshipsSlice.actions;
export default spaceshipsSlice.reducer;
