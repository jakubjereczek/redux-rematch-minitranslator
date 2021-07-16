import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import WordsList from './components/WordsList';


function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch.word.getAsync();
  }, [dispatch])

  const isWordsLoading = useAppSelector(store => store.loading.models.word)

  if (isWordsLoading)
    return <div>
      <h2>Loading...</h2>
    </div>

  return (
    <div>
      <WordsList />
    </div>
  );
}

export default App;
