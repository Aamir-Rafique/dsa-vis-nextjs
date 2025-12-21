/**
 * GRAPH VISUAL COMPONENT
 * Displays nodes and edges for graph algorithms
 * Shows BFS/DFS traversal visually
 */

'use client';

import React from 'react';

/**
 * GraphVisual Component
 * @param {object} props
 * @param {object} props.data - Graph data with nodes and edges
 * @param {object} props.highlights - Which nodes/edges to highlight
 */
export default function GraphVisual({ data, highlights = {} }) {
  if (!data || !data.graph) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-800 rounded-lg">
        <p className="text-gray-400">No graph to display</p>
      </div>
    );
  }

  const { nodes = [], edges = [] } = data.graph;

  // Get node color based on state
  const getNodeColor = (nodeId) => {
    if (highlights.current === nodeId) {
      return 'fill-purple-500';
    }
    if (highlights.visited?.includes(nodeId)) {
      return 'fill-green-500';
    }
    if (highlights.queue?.includes(nodeId)) {
      return 'fill-yellow-500';
    }
    if (highlights.start === nodeId) {
      return 'fill-blue-500';
    }
    return 'fill-gray-500';
  };

  return (
    <div className="w-full p-6 bg-gray-900 rounded-lg">
      <svg
        viewBox="0 0 500 400"
        className="w-full h-96 bg-gray-800 rounded-lg"
      >
        {/* Draw edges first (so they appear behind nodes) */}
        {edges.map((edge, index) => {
          const fromNode = nodes.find(n => n.id === edge.from);
          const toNode = nodes.find(n => n.id === edge.to);
          
          if (!fromNode || !toNode) return null;

          return (
            <line
              key={`edge-${index}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#4B5563"
              strokeWidth="2"
            />
          );
        })}

        {/* Draw nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            {/* Node circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r="25"
              className={`${getNodeColor(node.id)} transition-all duration-300`}
              stroke="white"
              strokeWidth="2"
            />
            
            {/* Node label */}
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dy=".3em"
              className="fill-white font-bold text-lg"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center text-sm mt-4">
        {highlights.current !== undefined && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            <span className="text-gray-300">Current</span>
          </div>
        )}
        {highlights.visited && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">Visited</span>
          </div>
        )}
        {highlights.queue && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-300">In Queue</span>
          </div>
        )}
      </div>
    </div>
  );
}
