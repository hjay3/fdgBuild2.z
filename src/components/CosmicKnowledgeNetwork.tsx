import React, { useEffect, useRef, useState, useCallback } from 'react';
import ForceGraph3D from '3d-force-graph';
import { Header } from './Header';
import { Controls } from './Controls';
import { initialGraphData } from '../data/graphData';
import * as THREE from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { LoadingSpinner } from './LoadingSpinner';

const CAMERA_DISTANCE = 400;

const CosmicKnowledgeNetwork = () => {
  const graphRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [isOrbiting, setIsOrbiting] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const setupPostProcessing = useCallback((Graph: any) => {
    const renderer = Graph.renderer();
    const scene = Graph.scene();
    const camera = Graph.camera();

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.0,
      0.5,
      0.85
    );

    composer.addPass(renderPass);
    composer.addPass(bloomPass);

    // Replace the default render function
    const defaultRender = Graph.render;
    Graph.render = () => {
      composer.render();
      defaultRender();
    };

    return () => {
      Graph.render = defaultRender;
      composer.dispose();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || graphRef.current) return;

    const Graph = ForceGraph3D()
      (containerRef.current)
      .backgroundColor('#000020')
      .nodeColor(node => {
        const colors = ['#4f46e5', '#06b6d4', '#8b5cf6', '#ec4899', '#10b981'];
        return colors[node.group];
      })
      .nodeLabel(node => showLabels ? node.id : null)
      .linkColor(() => '#ffffff')
      .linkOpacity(0.2)
      .linkWidth(1)
      .nodeRelSize(6)
      .linkDirectionalParticles(2)
      .linkDirectionalParticleWidth(2)
      .linkDirectionalParticleSpeed(0.006)
      .graphData(initialGraphData);

    graphRef.current = Graph;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    const pointLight = new THREE.PointLight(0xffffff, 0.4, 0);
    pointLight.position.set(200, 200, 200);
    Graph.scene().add(ambientLight);
    Graph.scene().add(pointLight);

    // Setup post-processing
    const cleanupPostProcessing = setupPostProcessing(Graph);

    // Initial camera position
    Graph.cameraPosition({ x: 0, y: 0, z: CAMERA_DISTANCE });

    // Orbital animation
    let angle = 0;
    const animate = () => {
      if (isOrbiting && graphRef.current) {
        angle += 0.001;
        const distance = CAMERA_DISTANCE + Math.sin(angle * 2) * 50;
        const x = distance * Math.sin(angle);
        const z = distance * Math.cos(angle);
        const y = 50 * Math.sin(angle * 2);
        Graph.cameraPosition({ x, y, z });
      }
      requestAnimationFrame(animate);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const { width, height } = containerRef.current?.getBoundingClientRect() || { width: window.innerWidth, height: window.innerHeight };
      Graph.width(width).height(height);
    };
    window.addEventListener('resize', handleResize);

    setIsLoading(false);

    return () => {
      window.removeEventListener('resize', handleResize);
      cleanupPostProcessing();
      Graph._destructor();
      graphRef.current = null;
    };
  }, [isOrbiting, showLabels, setupPostProcessing]);

  const handleReset = () => {
    if (!graphRef.current) return;
    setIsOrbiting(false);
    graphRef.current.cameraPosition(
      { x: 0, y: 0, z: CAMERA_DISTANCE },
      { x: 0, y: 0, z: 0 },
      2000
    );
    setTimeout(() => setIsOrbiting(true), 2500);
  };

  const handleScreenshot = () => {
    if (!graphRef.current) return;
    const canvas = graphRef.current.renderer().domElement;
    const link = document.createElement('a');
    link.download = 'cosmic-knowledge-network.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="relative w-screen h-screen bg-[#000020] overflow-hidden">
      {isLoading && <LoadingSpinner />}
      <div ref={containerRef} className="absolute inset-0" />
      <Header />
      <Controls 
        onReset={handleReset}
        onScreenshot={handleScreenshot}
        onToggleLabels={() => setShowLabels(!showLabels)}
        onToggleOrbit={() => setIsOrbiting(!isOrbiting)}
        showLabels={showLabels}
        isOrbiting={isOrbiting}
      />
    </div>
  );
};

export default CosmicKnowledgeNetwork;