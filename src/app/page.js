/**
 * LANDING PAGE
 * Homepage with a big "Start Visualizing" button
 * Simple and welcoming introduction to the DSA Visualizer
 */

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-8">
      {/* Main content */}
      <main className="text-center space-y-8 max-w-4xl">
        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
          Algorithm Visualizer
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          See algorithms come to life! 🚀
        </p>
        
        {/* Description */}
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
          Watch sorting, searching, and graph algorithms step-by-step.
          Learn by seeing. Understand by doing. Master data structures
          and algorithms through interactive visualizations!
        </p>
        
        {/* CTA Button */}
        <Link
          href="/visualize"
          className="inline-block px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          ▶ Start Visualizing
        </Link>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-lg font-bold text-white mb-2">Sorting Algorithms</h3>
            <p className="text-sm text-gray-400">
              Bubble, Selection, Insertion, Merge, and Quick Sort
            </p>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-white mb-2">Search Algorithms</h3>
            <p className="text-sm text-gray-400">
              Linear and Binary Search with step-by-step visualization
            </p>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <div className="text-4xl mb-3">🕸️</div>
            <h3 className="text-lg font-bold text-white mb-2">Graph Algorithms</h3>
            <p className="text-sm text-gray-400">
              BFS, DFS, and pathfinding algorithms
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm">
        <p>Built for students learning Data Structures & Algorithms</p>
      </footer>
    </div>
  );
}
