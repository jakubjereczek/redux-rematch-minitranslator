import React from 'react';
import { store, state } from '../store';
import { useAppDispatch, useAppSelector } from '../hooks';

const WordsList = () => {

    const words = useAppSelector(state => state.word.words);
    const words2 = store.select.word.wordsSelector(state);

    const translatedWords = store.select.word.getSelectedWordsMeaningSelector(state)
    console.log(translatedWords)

    return (
        <div>
            <h2>
                WordsList
            </h2>
        </div>
    )
}

export default WordsList;