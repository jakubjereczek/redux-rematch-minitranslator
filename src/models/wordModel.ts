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
    meaning: string
}

export interface Filter {
    from: availableLanguages,
    to: availableLanguages
}

interface WordState {
    words: Word[],
    filters: Filter
}

const initialState: WordState = {
    words: [{
        "PL": "dzwonek",
        "EN": "bell",
        "GE": "glocke"
    },
    {
        "PL": "drzwi",
        "EN": "door",
        "GE": "tür"
    }],
    filters: {
        from: "PL",
        to: "EN"
    }
}

export const word = createModel<RootModel>()({
    state: initialState,
    reducers: {
        LOAD_WORDS(state, payload: Word[]) {
            console.log("1. words are loaded")
            return {
                ...state,
                words: payload
            }
        },
        ADD_WORD(state, payload: Word) {
            return {
                ...state,
                words: [...state.words, payload]
            }
        },
    },
    effects: (dispatch) => {
        const { word } = dispatch;
        return {
            async getAsync() {
                const words = await getWordsAsync();
                word.LOAD_WORDS(words);
            }
        }
    },
    selectors: (slice, createSelector, hasProps) => ({
        wordsSelector() {
            return slice((words: WordState) => {
                return words.words
            });
        },
        filtersSelector() {
            return slice((words: WordState) => words.filters);
        },
        getSelectedWordsMeaningSelector() {
            return createSelector(
                slice,
                this.wordsSelector,
                this.filtersSelector,
                (items: any, filter: any) => {
                    return items.map((w: Word): WordMeaning => {
                        const filters = filter as Filter;
                        return {
                            word: w[filters.from],
                            meaning: w[filters.to]
                        }
                    })
                }
            )
        }
    })
});


