import { GraphData } from '../types/graph';

const DOMAIN_COLORS = {
  Physics: '#FF6B6B',
  Philosophy: '#4ECDC4',
  Art: '#45B7D1',
  Mathematics: '#96CEB4',
  Biology: '#FFEEAD'
};

export const generateNodes = (): GraphData => {
  const domains = Object.keys(DOMAIN_COLORS);
  const nodes = [];
  const links = [];
  
  // Create main domain nodes
  domains.forEach((domain, i) => {
    nodes.push({
      id: domain,
      group: i,
      size: 15,
      type: 'domain'
    });
  });
  
  // Create concept nodes for each domain
  domains.forEach((domain, i) => {
    const numConcepts = 5 + Math.floor(Math.random() * 5);
    for (let j = 0; j < numConcepts; j++) {
      const conceptId = `${domain}-concept-${j}`;
      nodes.push({
        id: conceptId,
        group: i,
        size: 8 + Math.random() * 4,
        type: 'concept'
      });
      links.push({
        source: domain,
        target: conceptId,
        value: 1 + Math.random() * 3
      });
      
      // Add cross-domain links
      if (Math.random() > 0.7) {
        const otherDomain = domains[(i + 1 + Math.floor(Math.random() * (domains.length - 1))) % domains.length];
        links.push({
          source: conceptId,
          target: `${otherDomain}-concept-${Math.floor(Math.random() * 5)}`,
          value: Math.random() * 2
        });
      }
    }
  });
  
  return { nodes, links };
};

export const getNodeColor = (group: number): string => {
  return Object.values(DOMAIN_COLORS)[group] || '#ffffff';
};