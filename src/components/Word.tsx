import React, { FC } from 'react';
import { WordMeaning } from '../models/wordModel';

interface WordProps extends WordMeaning {

}

const Word: FC<WordProps> = ({ word, meaning }) => {

    return (
        <li>
            {word} = {meaning}
        </li>
    )
}

export default Word;