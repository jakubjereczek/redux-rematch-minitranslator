import { createModel } from "@rematch/core";
import { getWordsAsync } from "../db";
import { RootModel } from "./models";


type availableLanguages = "PL" | "EN" | 'GE';

export interface Word {
    PL: string,
    EN: string,
    GE: string
}

export interface WordMeaning {
    word: string,
    meading: string
}

interface WordState {
    words: Word[],
    filters: {
        from: availableLanguages,
        to: availableLanguages
    }
}

const initialState: WordState = {
    words: [],
    filters: {
        from: "PL",
        to: "EN"
    }
}

export const word = createModel<RootModel>()({
    state: initialState,
    reducers: {
        load(state, payload: Word[]) {
            return {
                ...state,
                words: payload
            }
        },
        add(state, payload: Word) {
            return {
                ...state,
                words: [...state.words, payload]
            }
        },
    },
    effects: (dispatch) => ({
        async getAsync() {
            const words = await getWordsAsync();
            dispatch.word.load(words);
        },
    }),
});


