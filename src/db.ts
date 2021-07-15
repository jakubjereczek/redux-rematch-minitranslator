import { Word } from "./models/wordModel";

// examples words
const words: Word[] = [
    {
        "PL": "dzwonek",
        "EN": "bell",
        "GE": "glocke"
    },
    {
        "PL": "drzwi",
        "EN": "door",
        "GE": "tür"
    },
    {
        "PL": "samochód",
        "EN": "car",
        "GE": "auto"
    },
    {
        "PL": "niebieski",
        "EN": "blue",
        "GE": "blau"
    },
    {
        "PL": "gol",
        "EN": "goal",
        "GE": "tor"
    }
]

export const getWordsAsync = (): Promise<Word[]> =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(words);
        }, 2000)
    });
