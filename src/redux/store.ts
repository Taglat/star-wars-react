import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from './reducers/login-slice';
import CharactersReducer from './reducers/characters-slice';
import PlanetsReducer from './reducers/planets-slice';
import SpaceshipsReducer from './reducers/spaceships-slice';

const store = configureStore({
  reducer: {
    login: LoginReducer,
    characters: CharactersReducer,
    planets: PlanetsReducer,
    spaceships: SpaceshipsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;