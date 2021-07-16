import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { availableLanguages, Filter, initialState } from '../models/wordModel';

const Filters = () => {

    const filters = useAppSelector(state => state.word.filters);
    const [modifiedFilters, setModifiedFilters] = useState<Filter>(initialState.filters);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setModifiedFilters(filters);
    }, [filters])

    const languageFilters: Array<availableLanguages> = ["PL", "EN", "GE"]

    const handleChangeFilter = (filter: Filter) => {
        setModifiedFilters(filter);
        dispatch.word.CHANGE_FILTER(filter);
    };

    const buttonFilters = (isFrom: boolean) => languageFilters.map((filter) => {
        // If user click the button below.
        let changedFilter: Filter;
        if (isFrom) {
            changedFilter = {
                from: filter,
                to: modifiedFilters.to,
            }
        } else {
            changedFilter = {
                from: modifiedFilters.from,
                to: filter,
            }
        }
        return (
            <button disabled={!isFrom ?
                (filters.to === filter ? true : false) :
                (filters.from === filter ? true : false)
            } onClick={handleChangeFilter.bind(this, changedFilter)}>
                {filter}
            </button>
        )
    })

    return (
        <div>
            {buttonFilters(true)}
            to
            {buttonFilters(false)}
        </div>
    )
}

export default Filters;