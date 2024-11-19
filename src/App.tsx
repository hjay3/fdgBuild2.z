import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import CosmicKnowledgeNetwork from './components/CosmicKnowledgeNetwork';

function App() {
  return (
    <ErrorBoundary>
      <CosmicKnowledgeNetwork />
    </ErrorBoundary>
  );
}

export default App;