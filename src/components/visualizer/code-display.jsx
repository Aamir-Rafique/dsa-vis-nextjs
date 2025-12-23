"use client"

import { useState } from "react"
import { Copy, ChevronDown, ChevronUp, Code2, FileCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ALGORITHM_DETAILS } from "@/lib/algorithm-details"
import { SyntaxHighlighter } from "./syntax-highlighter"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function CodeDisplay({ algorithm, currentStep = 0 }) {
  const [copiedId, setCopiedId] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState("csharp")
  const [openSections, setOpenSections] = useState({
    code: false,
    complexity: false,
    description: false,
  })

  const details = ALGORITHM_DETAILS[algorithm.id] || ALGORITHM_DETAILS.default

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const getCurrentCode = () => {
    if (selectedLanguage === "csharp" && details.csharpCode) {
      return details.csharpCode
    }
    return details.code || details.javascriptCode || ""
  }

  const handleCopy = async () => {
    const code = getCurrentCode()
    await navigator.clipboard.writeText(code)
    setCopiedId("code")
    setTimeout(() => setCopiedId(null), 2000)
  }

  const languages = [
    // { id: "javascript", label: "JavaScript", available: !!(details.code || details.javascriptCode) },
    { id: "csharp", label: "C#", available: !!details.csharpCode },
  ]

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-card/50 to-card/30">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/60 backdrop-blur-sm p-4">
        <div className="flex items-center gap-2 mb-2">
          <Code2 className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Algorithm Details</h3>
        </div>
        <p className="text-xs text-muted-foreground">View code, complexity, and description</p>
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {/* Code Section - Collapsible */}
        <Collapsible open={openSections.code} onOpenChange={() => toggleSection("code")}>
          <div className="rounded-lg border border-border/50 bg-card/50 overflow-hidden">
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition group">
                <div className="flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Implementation Code</span>
                  {/* <Badge variant="secondary" className="text-xs">
                    {languages.filter(l => l.available).length} languages
                  </Badge> */}
                </div>
                {openSections.code ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition" />
                )}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="border-t border-border/50">
                {/* Language Selector */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/30">
                  <div className="flex items-center gap-2">
                    {languages.map((lang) => (
                      <Button
                        key={lang.id}
                        size="sm"
                        variant={selectedLanguage === lang.id ? "default" : "outline"}
                        onClick={() => setSelectedLanguage(lang.id)}
                        disabled={!lang.available}
                        className={`h-7 text-xs ${
                          selectedLanguage === lang.id
                            ? "bg-primary hover:bg-primary/90"
                            : ""
                        }`}
                      >
                        {lang.label}
                      </Button>
                    ))}
                  </div>
                  <Button size="sm" variant="ghost" onClick={handleCopy} className="h-7 text-xs gap-1.5">
                    <Copy className="w-3 h-3" />
                    {copiedId === "code" ? "Copied!" : "Copy"}
                  </Button>
                </div>
                
                {/* Code Display */}
                <div className="relative">
                  <pre className="overflow-auto p-4 text-xs font-mono bg-muted/20 max-h-96">
                    <SyntaxHighlighter 
                      code={getCurrentCode()} 
                      language={selectedLanguage === "csharp" ? "csharp" : "javascript"} 
                    />
                  </pre>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Complexity Section - Collapsible */}
        <Collapsible open={openSections.complexity} onOpenChange={() => toggleSection("complexity")}>
          <div className="rounded-lg border border-border/50 bg-card/50 overflow-hidden">
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition group">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-secondary" />
                  <span className="font-semibold">Complexity Analysis</span>
                </div>
                {openSections.complexity ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition" />
                )}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 space-y-4 border-t border-border/50">
                {/* Time Complexity */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    Time Complexity
                    <Badge variant="outline" className="text-xs">Big O</Badge>
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                      <div className="text-xs text-muted-foreground font-medium">Best Case</div>
                      <div className="font-mono font-bold text-green-600 dark:text-green-400 text-lg mt-1">
                        {details.complexity?.best || "O(n)"}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                      <div className="text-xs text-muted-foreground font-medium">Average Case</div>
                      <div className="font-mono font-bold text-yellow-600 dark:text-yellow-400 text-lg mt-1">
                        {details.complexity?.average || "O(n)"}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                      <div className="text-xs text-muted-foreground font-medium">Worst Case</div>
                      <div className="font-mono font-bold text-red-600 dark:text-red-400 text-lg mt-1">
                        {details.complexity?.worst || "O(n)"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Space Complexity */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Space Complexity</h4>
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                    <div className="font-mono font-bold text-blue-600 dark:text-blue-400 text-lg">
                      {details.complexity?.space || "O(1)"}
                    </div>
                  </div>
                </div>

                {/* Properties */}
                {/* <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Properties</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="text-xs text-muted-foreground mb-1">Stable</div>
                      <div className="font-semibold text-sm">
                        {details.stability ? "✓ Yes" : "✗ No"}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="text-xs text-muted-foreground mb-1">In-Place</div>
                      <div className="font-semibold text-sm">
                        {details.inPlace ? "✓ Yes" : "✗ No"}
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Description Section - Collapsible */}
        <Collapsible open={openSections.description} onOpenChange={() => toggleSection("description")}>
          <div className="rounded-lg border border-border/50 bg-card/50 overflow-hidden">
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition group">
                <div className="flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-accent" />
                  <span className="font-semibold">Algorithm Description</span>
                </div>
                {openSections.description ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition" />
                )}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 space-y-5 border-t border-border/50 text-sm">
                {/* Overview */}
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Overview
                  </h4> 
                  <p className="text-muted-foreground text-justify leading-relaxed pl-3.5">
                    {details.description || "No description available."}
                  </p>
                </div>

                {/* How It Works */}
                {details.howItWorks && details.howItWorks.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      How It Works
                    </h4>
                    <ol className="space-y-2.5 text-muted-foreground pl-3.5">
                      {details.howItWorks.map((step, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="font-bold text-primary flex-shrink-0 w-5">{idx + 1}.</span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Advantages */}
                {details.advantages && details.advantages.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      Advantages
                    </h4>
                    <ul className="space-y-2 text-muted-foreground pl-3.5">
                      {details.advantages.map((adv, idx) => (
                        <li key={idx} className="flex gap-2.5">
                          <span className="text-green-500 flex-shrink-0 font-bold">✓</span>
                          <span className="leading-relaxed">{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Disadvantages */}
                {details.disadvantages && details.disadvantages.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                      Disadvantages
                    </h4>
                    <ul className="space-y-2 text-muted-foreground pl-3.5">
                      {details.disadvantages.map((disadv, idx) => (
                        <li key={idx} className="flex gap-2.5">
                          <span className="text-red-500 flex-shrink-0 font-bold">✗</span>
                          <span className="leading-relaxed">{disadv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Use Cases */}
                {details.useCases && (
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      When to Use
                    </h4>
                    <p className="text-muted-foreground leading-relaxed pl-3.5  text-justify">{details.useCases}</p>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    </div>
  )
}
