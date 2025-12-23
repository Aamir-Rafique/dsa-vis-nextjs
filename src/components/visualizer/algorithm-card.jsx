"use client"

import { ArrowRight, Zap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const DIFFICULTY_COLORS = {
  Easy: "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30",
  Medium: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
  Hard: "bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30",
}

export function AlgorithmCard({ algorithm, onSelect }) {
  return (
    <div className="group relative p-5 rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative space-y-4 h-full flex flex-col" onClick={() => onSelect(algorithm)}>
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition">
              {algorithm.name}
            </h3>
            <Zap className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className={`text-xs px-2.5 py-1 font-medium border ${DIFFICULTY_COLORS[algorithm.difficulty]}`}
            >
              {algorithm.difficulty}
            </Badge>
            <Badge variant="secondary" className="text-xs px-2.5 py-1 font-mono">
              <Clock className="w-3 h-3 mr-1 inline" />
              {algorithm.complexity}
            </Badge>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {algorithm.description}
        </p>

        {/* Tags */}
        {/* <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/30">
          {algorithm.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-secondary/15 text-secondary-foreground px-2.5 py-1 rounded-full hover:bg-secondary/25 transition"
            >
              #{tag}
            </span>
          ))}
        </div> */}

        {/* CTA Button */}
        <Button
          className="w-full mt-2 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-accent-foreground shadow-md group-hover:shadow-lg group-hover:shadow-accent/20 transition-all"
          onClick={(e) => {
            e.stopPropagation()
            onSelect(algorithm)
          }}
        >
          Visualize Now
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  )
}
