import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import WordsList from './components/WordsList';
import { useDetectFirstRender } from './hooks/useDetectFirstRender';
import Filters from './components/Filters';


function App() {

  const isFirstRender = useDetectFirstRender();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch.word.getAsync();
  }, [dispatch])

  const isWordsLoading = useAppSelector(store => store.loading.models.word)

  if (isFirstRender || isWordsLoading) {
    return <div>
      <h2>Loading...</h2>
    </div>
  } else {
    return (
      <div>
        <Filters />
        <WordsList />
      </div>
    );
  }


}

export default App;
