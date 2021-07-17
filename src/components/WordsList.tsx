import React from 'react';
import { store, StateType } from '../store';
import { useAppDispatch, useAppSelector } from '../hooks';
import { connect } from 'react-redux';
import { WordMeaning, Word as IWord } from '../models/wordModel';
import Word from './Word';
import { useEffect } from 'react';

// 1. selectors
const translatedWords = (state: StateType) => store.select.word.getSelectedWordsMeaningSelector(state)

const mapStateToProps = (state: StateType) => ({
    words: translatedWords(state),
})

type StateProps = ReturnType<typeof mapStateToProps>;

const WordsList = (props: StateProps) => {

    // 2. use seletors 
    const filters = useAppSelector(state => state.word.filters);
    const words: WordMeaning[] = props.words;

    const dispatch = useAppDispatch();

    useEffect(() => {
        // add new word to check immer plugin (reducers can perform mutations to achieve the next immutable state)

        const newWord: IWord = {
            "PL": "łyżeczka",
            "EN": "teaspoon",
            "GE": "teelöffel"
        }
        dispatch.word.ADD_WORD(newWord);
    }, [dispatch])

    const wordsList = words.map((word) => {
        return (
            <Word key={word.meaning} {...word} />
        )
    });

    return (
        <div>
            <h2>
                minitranslator app
            </h2>
            <h3>
                current filters: {filters.from} to {filters.to}
            </h3>
            <ul>
                {wordsList}
            </ul>
        </div>
    )
}


export default connect(mapStateToProps)(WordsList)
