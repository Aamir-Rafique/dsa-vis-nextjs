"use client"

import Link from "next/link"
import { ChevronRight, Brain, Zap, Code2, Sparkles, BookOpen, GitBranch, Bold } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-card/60 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">DSAVis</h1>
              <p className="text-xs text-muted-foreground">Learn by watching</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition">
              Features
            </a>
            <a href="#algorithms" className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition">
              Algorithms
            </a>
            {/* <ThemeToggle /> */}
            <Link href="/visualizer">
              <Button className="bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent shadow-lg shadow-accent/20">
                Launch Visualizer
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <Badge variant="outline" className="px-4 py-1.5 text-sm border-primary/30 bg-primary/5">
            <Sparkles className="w-3 h-3 mr-2 inline" />
            Interactive Learning Platform
          </Badge>

          <div className="space-y-6">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
              Master Algorithms Through{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
                Visual Magic
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              Experience the beauty of algorithms with real-time visualizations. Watch, learn, and master data structures
              like never before.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/visualizer">
              <Button size="lg" className="bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-lg px-8 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all">
                Start Learning
                <Zap className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-card/50 backdrop-blur border-border/50 hover:bg-card hover:border-border">
                Explore Features
                <Code2 className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12 px-4">
            <div className="group p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 space-y-2 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all hover:-translate-y-1">
              <div className="text-3xl font-bold bg-gradient-to-r from-accent to-accent/80 text-transparent bg-clip-text">10+</div>
              <div className="text-sm text-muted-foreground font-medium">Algorithms</div>
            </div>
            <div className="group p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 space-y-2 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all hover:-translate-y-1">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">100%</div>
              <div className="text-sm text-muted-foreground font-medium">Interactive</div>
            </div>
            <div className="group flex flex-col items-center gap-1.5 p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 space-y-2 hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/10 transition-all hover:-translate-y-1">
              {/* <div className="text-3xl font-bold text-center  flex-1 justify-center"> */}
                <Code2 color="blue" size={30} />
              {/* </div> */}
              <div className="text-sm text-muted-foreground font-medium">Code Display</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-card/50 backdrop-blur-sm border-y border-border/40">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="w-3 h-3 mr-2 inline" />
              Features
            </Badge>
            <h3 className="text-4xl font-bold">Why DSAVis?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Everything you need to understand data structures and algorithms
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                gradient: "from-blue-500 to-cyan-500",
                title: "Step-by-Step Execution",
                desc: "Watch each step of the algorithm with detailed state tracking and real-time updates",
              },
              {
                icon: Zap,
                gradient: "from-yellow-500 to-orange-500",
                title: "Real-Time Visualization",
                desc: "See how data structures change and algorithms progress with smooth animations",
              },
              {
                icon: Code2,
                gradient: "from-purple-500 to-pink-500",
                title: "Syntax Highlighted Code",
                desc: "View algorithm implementations with color-coded, easy-to-read syntax",
              },
              {
                icon: GitBranch,
                gradient: "from-green-500 to-emerald-500",
                title: "Interactive Controls",
                desc: "Control speed, pause, step through, and customize input values on the fly",
              },
              {
                icon: Brain,
                gradient: "from-indigo-500 to-purple-500",
                title: "Complexity Analysis",
                desc: "Understand Big-O notation and time/space complexity for each algorithm",
              },
              {
                icon: Sparkles,
                gradient: "from-pink-500 to-rose-500",
                title: "Comprehensive Coverage",
                desc: "Learn sorting, searching, graphs, trees, linked lists, and much more",
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="group p-6 rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/50 space-y-4 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all hover:-translate-y-1 cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-4 bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            <p>DSAVis - Learn Algorithms Interactively</p>
          </div>
          <p>Built with ❤️ by Aamir Rafique</p>
        </div>
      </footer>
    </div>
  )
}
