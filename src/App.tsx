import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';


function App() {

  // loading data
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch.word.getAsync();
  }, [dispatch])

  const words = useAppSelector(state => state.word.words);
  const isWordsLoading = useAppSelector(store => store.loading.models.word)

  if (isWordsLoading)
    return <div>
      <h2>Loading...</h2>
    </div>

  return (
    <div>
      Content
    </div>
  );
}

export default App;
