# Setup Instructions 🚀

Complete guide to get the DSA Visualizer running on your machine.

## Prerequisites

Before you begin, make sure you have:

- **Node.js** version 18 or higher ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- A code editor like **VS Code** (recommended)
- A modern web browser (Chrome, Firefox, Edge, Safari)

## Installation Steps

### 1. Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install:
- Next.js 16
- React 19
- Tailwind CSS 4
- GSAP (for animations)
- All other dependencies

**Expected time:** 1-2 minutes

### 2. Verify Installation

Check that everything installed correctly:

```bash
npm list --depth=0
```

You should see all the packages listed in `package.json`.

### 3. Run Development Server

Start the development server:

```bash
npm run dev
```

You should see:
```
  ▲ Next.js 16.1.0
  - Local:        http://localhost:3000
  - ready in XXXms
```

### 4. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

You should see the landing page with "Algorithm Visualizer" title.

### 5. Test the Visualizer

1. Click **"Start Visualizing"**
2. Select an algorithm (try "Bubble Sort")
3. Click **"Randomize Array"**
4. Press **"Play"**
5. Watch the magic! ✨

## Project Structure Overview

```
dsa-vis-nextjs/
│
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.js            # Landing page (/)
│   │   ├── visualize/
│   │   │   └── page.jsx       # Main visualizer (/visualize)
│   │   ├── layout.js          # Root layout
│   │   └── globals.css        # Global styles
│   │
│   ├── components/            # React components
│   │   ├── AlgorithmPicker.jsx
│   │   ├── ArrayVisual.jsx
│   │   ├── GraphVisual.jsx
│   │   ├── ControlsBar.jsx
│   │   ├── StepInfo.jsx
│   │   └── InputForm.jsx
│   │
│   └── lib/
│       ├── algorithms/        # All algorithm implementations
│       │   ├── sorting/
│       │   │   ├── bubbleSort.js
│       │   │   ├── selectionSort.js
│       │   │   ├── insertionSort.js
│       │   │   ├── mergeSort.js
│       │   │   └── quickSort.js
│       │   ├── searching/
│       │   │   ├── linearSearch.js
│       │   │   └── binarySearch.js
│       │   ├── graph/
│       │   │   ├── bfs.js
│       │   │   └── dfs.js
│       │   ├── string/
│       │   │   └── huffmanCoding.js
│       │   └── allAlgorithms.js
│       │
│       ├── helpers/
│       │   ├── animations.js
│       │   └── dataGenerator.js
│       │
│       └── hooks/
│           └── useAlgorithm.js
│
├── docs/                      # Documentation
│   ├── HOW_TO_ADD_ALGORITHM.md
│   └── ALGORITHMS_EXPLAINED.md
│
├── package.json               # Dependencies
├── next.config.mjs            # Next.js config
├── tailwind.config.js         # Tailwind config
└── README.md                  # Main documentation
```

## Available Scripts

### Development
```bash
npm run dev
```
Starts development server at http://localhost:3000

### Production Build
```bash
npm run build
```
Creates an optimized production build

### Start Production Server
```bash
npm start
```
Runs the production build (must run `npm run build` first)

### Linting
```bash
npm run lint
```
Checks code for errors and style issues

## Common Issues & Solutions

### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill the process
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Issue: GSAP not working

**Solution:**
```bash
npm install gsap --save
```

### Issue: Tailwind styles not applying

**Solution:**
1. Check that `tailwind.config.js` exists
2. Verify `globals.css` imports Tailwind
3. Clear `.next` cache and restart:
```bash
rm -rf .next
npm run dev
```

### Issue: Hot reload not working

**Solution:**
Restart the dev server:
```bash
# Press Ctrl+C to stop
npm run dev
```

## Browser Compatibility

The visualizer works on:
- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Opera (v76+)

## Performance Tips

For the best experience:

1. **Use a modern browser** - Chrome or Edge recommended
2. **Close unnecessary tabs** - Animations are GPU-intensive
3. **Adjust speed** - If visualization is laggy, slow down the speed
4. **Limit array size** - Keep arrays under 20 elements for smooth animations

## Development Tips

### Hot Module Replacement (HMR)

Changes to `.jsx`, `.js`, and `.css` files auto-reload in the browser. No need to manually refresh!

### File Watching

Next.js watches these files:
- All files in `src/`
- Configuration files
- `package.json`

Changes trigger automatic recompilation.

### Adding New Dependencies

```bash
# Add a new package
npm install package-name

# Add as dev dependency
npm install --save-dev package-name
```

## Customization Guide

### Change Color Scheme

Edit [`src/app/globals.css`](src/app/globals.css):

```css
:root {
  --color-default: #3b82f6;    /* Change default color */
  --color-comparing: #fbbf24;  /* Change comparing color */
  /* etc... */
}
```

### Add a New Algorithm

See [docs/HOW_TO_ADD_ALGORITHM.md](docs/HOW_TO_ADD_ALGORITHM.md) for detailed instructions.

### Modify Animations

Edit [`src/lib/helpers/animations.js`](src/lib/helpers/animations.js) to customize GSAP animations.

## Building for Production

### Step 1: Create Production Build

```bash
npm run build
```

This creates optimized files in `.next/` directory.

### Step 2: Test Production Build Locally

```bash
npm start
```

Visit http://localhost:3000 to test.

### Step 3: Deploy

**Vercel (Recommended):**
```bash
npm install -g vercel
vercel
```

**Netlify:**
1. Build command: `npm run build`
2. Publish directory: `.next`

**Other Platforms:**
- Use Node.js 18+
- Run `npm install && npm run build`
- Start with `npm start`

## Environment Variables (Optional)

Create `.env.local` for custom settings:

```env
# Example environment variables
NEXT_PUBLIC_APP_NAME=DSA Visualizer
NEXT_PUBLIC_VERSION=1.0.0
```

Access in code:
```javascript
const appName = process.env.NEXT_PUBLIC_APP_NAME;
```

## Getting Help

### Resources
- 📖 [Main README](../README.md)
- 📚 [Algorithm Explanations](ALGORITHMS_EXPLAINED.md)
- 🔧 [How to Add Algorithms](HOW_TO_ADD_ALGORITHM.md)
- 🌐 [Next.js Documentation](https://nextjs.org/docs)
- 🎨 [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Common Questions

**Q: Can I use TypeScript?**
A: This project uses JavaScript for simplicity, but you can convert files to `.tsx` if needed.

**Q: How do I add more algorithms?**
A: Follow the guide in [HOW_TO_ADD_ALGORITHM.md](HOW_TO_ADD_ALGORITHM.md)

**Q: Can I customize the UI?**
A: Yes! Edit the components in `src/components/` and styles in `globals.css`

**Q: Is this suitable for learning?**
A: Absolutely! All code is well-commented and beginner-friendly.

## Troubleshooting Checklist

Before asking for help, try these:

- [ ] Restart the dev server
- [ ] Clear cache: `rm -rf .next node_modules && npm install`
- [ ] Check Node.js version: `node --version` (should be 18+)
- [ ] Check for errors in browser console (F12)
- [ ] Check terminal for error messages
- [ ] Verify all files are in correct locations

## Next Steps

Once everything is running:

1. ✅ Explore all available algorithms
2. ✅ Try different input sizes
3. ✅ Experiment with speed controls
4. ✅ Read the algorithm explanations
5. ✅ Try adding your own algorithm!

---

**Happy Coding! 🎉**

If everything is working, you're ready to start visualizing algorithms!
