import React from 'react';
import { store, StateType } from '../store';
import { useAppSelector } from '../hooks';
import { connect } from 'react-redux';
import { WordMeaning } from '../models/wordModel';
import Word from './Word';

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
