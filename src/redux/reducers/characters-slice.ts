import { IPeople } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface CharactersState {
  data: IPeople[];
  loadedPages: number[];
  loading: boolean;
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: CharactersState = {
  data: [],
  loadedPages: [],
  loading: false,
  page: 1,
  totalPages: 0,
  error: null,
};

const loadLocalStorageData = (): IPeople[] => {
  const storedData = localStorage.getItem("characters");
  return storedData ? JSON.parse(storedData) : [];
};

const initialLocalData = loadLocalStorageData();

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (page: number, { getState, rejectWithValue }) => {
    const state = getState() as { characters: CharactersState };

    if (state.characters.loadedPages.includes(page)) {
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
  initialState: {
    ...initialState,
    data: initialLocalData,
  },
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    updateCharacter: (state, action: PayloadAction<IPeople>) => {
      const index = state.data.findIndex((char) => char.url === action.payload.url);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
      localStorage.setItem("characters", JSON.stringify(state.data));
      alert("Сохранено")
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

          const uniqueData = data.filter(
            (newChar:Partial<IPeople>) => !state.data.some((existingChar) => existingChar.url === newChar.url)
          );

          state.data = [...state.data, ...uniqueData];
          state.loadedPages.push(page);
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
