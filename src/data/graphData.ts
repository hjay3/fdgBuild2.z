import { GraphData } from '../types/graph';

export const initialGraphData: GraphData = {
  nodes: [
    { id: 'Physics', group: 0 },
    { id: 'Mathematics', group: 1 },
    { id: 'Philosophy', group: 2 },
    { id: 'Art', group: 3 },
    { id: 'Biology', group: 4 },
    { id: 'Quantum Mechanics', group: 0 },
    { id: 'Relativity', group: 0 },
    { id: 'Linear Algebra', group: 1 },
    { id: 'Geometry', group: 1 },
    { id: 'Logic', group: 2 },
    { id: 'Ethics', group: 2 },
    { id: 'Digital Art', group: 3 },
    { id: 'Sculpture', group: 3 },
    { id: 'Genetics', group: 4 },
    { id: 'Evolution', group: 4 },
    { id: 'String Theory', group: 0 },
    { id: 'Calculus', group: 1 },
    { id: 'Metaphysics', group: 2 },
    { id: 'Animation', group: 3 },
    { id: 'Neuroscience', group: 4 }
  ],
  links: [
    // Physics connections
    { source: 'Physics', target: 'Quantum Mechanics' },
    { source: 'Physics', target: 'Relativity' },
    { source: 'Physics', target: 'String Theory' },
    { source: 'Physics', target: 'Mathematics' },
    
    // Mathematics connections
    { source: 'Mathematics', target: 'Linear Algebra' },
    { source: 'Mathematics', target: 'Geometry' },
    { source: 'Mathematics', target: 'Calculus' },
    
    // Philosophy connections
    { source: 'Philosophy', target: 'Logic' },
    { source: 'Philosophy', target: 'Ethics' },
    { source: 'Philosophy', target: 'Metaphysics' },
    
    // Art connections
    { source: 'Art', target: 'Digital Art' },
    { source: 'Art', target: 'Sculpture' },
    { source: 'Art', target: 'Animation' },
    
    // Biology connections
    { source: 'Biology', target: 'Genetics' },
    { source: 'Biology', target: 'Evolution' },
    { source: 'Biology', target: 'Neuroscience' },
    
    // Interdisciplinary connections
    { source: 'Physics', target: 'Philosophy' },
    { source: 'Mathematics', target: 'Physics' },
    { source: 'Biology', target: 'Physics' },
    { source: 'Art', target: 'Mathematics' },
    { source: 'Philosophy', target: 'Mathematics' },
    { source: 'Digital Art', target: 'Mathematics' },
    { source: 'Neuroscience', target: 'Philosophy' },
    { source: 'Evolution', target: 'Philosophy' },
    { source: 'Quantum Mechanics', target: 'Metaphysics' }
  ]
};