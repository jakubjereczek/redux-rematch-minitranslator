import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { models, RootModel } from "./models/models"

import loadingPlugin, { ExtraModelsFromLoading } from "@rematch/loading";
import selectPlugin from '@rematch/select'

type FullModel = ExtraModelsFromLoading<RootModel>

export const store = init<RootModel, FullModel>({
    models,
    plugins: [loadingPlugin(), selectPlugin()],

});

export const { select } = store;
export const state = store.getState();

export type Store = typeof store;
export type StateType = typeof state;

export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;