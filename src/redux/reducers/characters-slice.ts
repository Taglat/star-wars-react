import { IPeople } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface CharactersState {
  data: IPeople[];
  loading: boolean;
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: CharactersState = {
  data: [],
  loading: false,
  page: 1,
  totalPages: 0,
  error: null,
};

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}people/?page=${page}`);
      return {
        data: response.data.results,
        totalPages: Math.ceil(response.data.count / 10),
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage } = charactersSlice.actions;
export default charactersSlice.reducer;
