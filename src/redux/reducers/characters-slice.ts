import { IPeople } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface CharactersState {
  data: { [page: number]: IPeople[] };
  loading: boolean;
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: CharactersState = {
  data: {},
  loading: false,
  page: 1,
  totalPages: 0,
  error: null,
};

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (page: number, { getState, rejectWithValue }) => {
    const state = getState() as { characters: CharactersState };

    if (state.characters.data[page]) {
      return null;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API}people/?page=${page}`);
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

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    updateCharacter: (state, action: PayloadAction<IPeople>) => {
      const pageEntries = Object.entries(state.data);
      for (let [, characters] of pageEntries) {
        const index = characters.findIndex((char) => char.url === action.payload.url);
        if (index !== -1) {
          characters[index] = action.payload;
          localStorage.setItem("characters", JSON.stringify(state.data));
          break;
        }
      }
      alert("Сохранено");
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
        if (action.payload) {
          const { data, page, totalPages } = action.payload;

          state.data[page] = data;
          state.totalPages = totalPages;

          localStorage.setItem("characters", JSON.stringify(state.data));
        }
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage, updateCharacter } = charactersSlice.actions;
export default charactersSlice.reducer;
