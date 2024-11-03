import { IStarship } from "@/types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface SpaceshipsState {
  data: IStarship[];
  loadedPages: number[];
  loading: boolean;
  page: number;
  totalPages: number;
  error: string | null;
}

const initialState: SpaceshipsState = {
  data: [],
  loadedPages: [],
  loading: false,
  page: 1,
  totalPages: 0,
  error: null,
};

const loadLocalStorageData = (): IStarship[] => {
  const storedData = localStorage.getItem("spaceships");
  return storedData ? JSON.parse(storedData) : [];
};

const initialLocalData = loadLocalStorageData();

export const fetchSpaceships = createAsyncThunk(
  "spaceships/fetchSpaceships",
  async (page: number, { getState, rejectWithValue }) => {
    const state = getState() as { spaceships: SpaceshipsState };

    if (state.spaceships.loadedPages.includes(page)) {
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
  initialState: {
    ...initialState,
    data: initialLocalData,
  },
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    updateSpaceship: (state, action: PayloadAction<IStarship>) => {
      const index = state.data.findIndex((spaceship) => spaceship.url === action.payload.url);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
      localStorage.setItem("spaceships", JSON.stringify(state.data));
      alert("Сохранено")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpaceships.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('fetchSpaceships.pending')
      })
      .addCase(fetchSpaceships.fulfilled, (state, action) => {
        console.log('fetchSpaceships.fulfilled')

        state.loading = false;
        if (action.payload) {
          const { data, page, totalPages } = action.payload;

          const uniqueData = data.filter(
            (newSpaceship:Partial<IStarship>) => !state.data.some((existingSpaceship) => existingSpaceship.url === newSpaceship.url)
          );

          state.data = [...state.data, ...uniqueData];
          state.loadedPages.push(page);
          state.totalPages = totalPages;

          localStorage.setItem("spaceships", JSON.stringify(state.data));
        }
      })
      .addCase(fetchSpaceships.rejected, (state, action) => {
        console.log('fetchSpaceships.rejected')
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage, updateSpaceship } = spaceshipsSlice.actions;
export default spaceshipsSlice.reducer;
