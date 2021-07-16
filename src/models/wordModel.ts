import { createModel } from "@rematch/core";
import { Selector } from "@rematch/select";
import { getWordsAsync } from "../db";
import { RootModel } from "./models";

export type availableLanguages = "PL" | "EN" | 'GE';

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

export const initialState: WordState = {
    words: [],
    filters: {
        from: "PL",
        to: "EN"
    }
}

export const word = createModel<RootModel>()({
    state: initialState,
    reducers: {
        LOAD_WORDS(state, payload: Word[]) {
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
        CHANGE_FILTER(state, payload: Filter) {
            console.log("PAYLOAD JEST RÓWNY", payload)
            return {
                ...state,
                filters: payload
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
            // return createSelector<any, WordState, Word[]>(
            //     slice,
            //     words => words.words
            // )
        },
        filtersSelector() {
            return slice((words: WordState) => words.filters);
            // return createSelector<any, WordState, Filter>(
            //     slice,
            //     words => words.filters
            // )
        },
        getSelectedWordsMeaningSelector() {
            return createSelector<any, any, any, WordMeaning[]>(
                this.wordsSelector,
                this.filtersSelector,
                (items: Word[], filter: Filter) => {
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


