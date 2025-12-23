"use client"

// Simple syntax highlighter for algorithm code
export function SyntaxHighlighter({ code, language = "javascript" }) {
  const highlightCode = (code) => {
    let highlighted = code

    // JavaScript/Java syntax highlighting
    if (language === "javascript" || language === "java") {
      // Keywords (blue)
      highlighted = highlighted.replace(
        /\b(function|const|let|var|if|else|for|while|return|new|this|class|extends|import|export|async|await)\b/g,
        '<span class="text-blue-400">$1</span>',
      )

      // Strings (green)
      highlighted = highlighted.replace(
        /('([^'\\]|\\.)*'|"([^"\\]|\\.)*"|`([^`\\]|\\.)*`)/g,
        '<span class="text-green-400">$1</span>',
      )

      // Numbers (yellow)
      highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="text-yellow-400">$1</span>')

      // Comments (gray)
      highlighted = highlighted.replace(/\/\/.*$/gm, '<span class="text-gray-500">$&</span>')

      // Function calls (cyan)
      highlighted = highlighted.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, '<span class="text-cyan-400">$1</span>')

      // Operators (magenta)
      highlighted = highlighted.replace(/([=+\-*/%<>!&|^]+)/g, '<span class="text-magenta-400">$1</span>')
    }

    return highlighted
  }

  return (
    <code
      dangerouslySetInnerHTML={{
        __html: highlightCode(code),
      }}
      className="text-foreground"
    />
  )
}
