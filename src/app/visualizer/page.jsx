"use client"

import { useState } from "react"
import { ChevronLeft, Menu, X, Brain, Home } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/visualizer/sidebar"
import { VisualizationContainer } from "@/components/visualizer/visualization-container"
import { AlgorithmBrowser } from "@/components/visualizer/algorithm-browser"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { SiGithub } from 'react-icons/si'
import useIsMobile from "@/hooks/useIsMobile"

export default function VisualizerPage() {
  const isMobile = useIsMobile(768);
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null)

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/10">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/60 backdrop-blur-md shadow-sm h-16 flex items-center px-4 gap-4 z-50">
        <Button
          variant="ghost"
          title={sidebarOpen ? 'Close side panel' : 'Open Side Panel'}
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hover:bg-primary/10"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        <Link href="/visualizer" className="flex items-center gap-2 hover:opacity-75 transition group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </Link>


        <div className="flex-1 flex items-center justify-center">
          {selectedAlgorithm ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                <Brain className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold">{selectedAlgorithm.name}</h1>
                {/* <Badge variant="outline" className="text-xs h-5">
                  {selectedAlgorithm.category}
                </Badge> */}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-bold">Algorithm Browser</h1>
            </div>
          )}
        </div>

        {/* <ThemeToggle /> */}

        <Link href="/" className="flex items-center gap-2 hover:opacity-75 transition group mr-5" title="Home">
          <Home className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </Link>

        <a href="https://aamirrafique.netlify.app/"
          rel="noopener"
          target="_blank"
          className="flex items-center gap-2 hover:opacity-75 transition group mr-10" title="Dev Portfolio">
          <SiGithub className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </a>

      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {!isMobile && sidebarOpen && (
          <div className="w-64 border-r border-border/40 bg-card/40 backdrop-blur-sm overflow-y-auto">
            <Sidebar onSelectAlgorithm={setSelectedAlgorithm} selectedAlgorithm={selectedAlgorithm} />
          </div>
        )}

        {/* Main Area */}
        <div className="flex-1 overflow-auto bg-gradient-to-br from-background to-muted/5">
          {selectedAlgorithm ? (
            <VisualizationContainer algorithm={selectedAlgorithm} />
          ) : (
            <AlgorithmBrowser onSelectAlgorithm={setSelectedAlgorithm} />
          )}
        </div>
      </div>
    </div>
  )
}
