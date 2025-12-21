/**
 * HUFFMAN CODING
 * A compression algorithm that uses variable-length codes.
 * More frequent characters get shorter codes!
 * 
 * How it works:
 * 1. Count frequency of each character
 * 2. Build a binary tree (Huffman tree)
 * 3. Generate codes from tree (left=0, right=1)
 * 4. Encode text using these codes
 */

export const meta = {
  id: 'huffman-coding',
  name: 'Huffman Coding',
  category: 'string',
  description: 'Compress text by giving shorter codes to frequent characters!',
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(n)'
};

export function initialize(input) {
  return {
    text: input.text || '',
    step: 0
  };
}

export function* run(state, controls) {
  const { text } = state;
  let stepNum = 0;
  
  // Step 1: Count frequencies
  const freqMap = {};
  for (const char of text) {
    freqMap[char] = (freqMap[char] || 0) + 1;
  }
  
  yield {
    step: stepNum++,
    description: `Counted character frequencies`,
    data: { frequencyTable: freqMap },
    done: false
  };
  
  // Step 2: Create leaf nodes
  const nodes = Object.entries(freqMap).map(([char, freq]) => ({
    char,
    frequency: freq,
    left: null,
    right: null
  }));
  
  yield {
    step: stepNum++,
    description: `Created ${nodes.length} leaf nodes`,
    data: { nodes: [...nodes] },
    done: false
  };
  
  // Step 3: Build Huffman tree
  const heap = [...nodes];
  
  while (heap.length > 1) {
    heap.sort((a, b) => a.frequency - b.frequency);
    
    const left = heap.shift();
    const right = heap.shift();
    
    const parent = {
      char: null,
      frequency: left.frequency + right.frequency,
      left,
      right
    };
    
    heap.push(parent);
    
    yield {
      step: stepNum++,
      description: `Combined nodes with frequencies ${left.frequency} and ${right.frequency}`,
      data: { tree: parent, heap: [...heap] },
      done: false
    };
  }
  
  const root = heap[0];
  
  // Step 4: Generate codes
  const codes = {};
  
  function generateCodes(node, code = '') {
    if (node.char !== null) {
      codes[node.char] = code || '0';
      return;
    }
    if (node.left) generateCodes(node.left, code + '0');
    if (node.right) generateCodes(node.right, code + '1');
  }
  
  generateCodes(root);
  
  yield {
    step: stepNum++,
    description: `Generated Huffman codes`,
    data: { tree: root, codes },
    done: false
  };
  
  // Step 5: Encode text
  const encoded = text.split('').map(char => codes[char]).join('');
  const originalBits = text.length * 8;
  const compressedBits = encoded.length;
  const compressionRatio = ((1 - compressedBits / originalBits) * 100).toFixed(2);
  
  yield {
    step: stepNum++,
    description: `✅ Text encoded! Compression: ${compressionRatio}% savings`,
    data: {
      tree: root,
      codes,
      originalText: text,
      encodedText: encoded,
      originalBits,
      compressedBits,
      compressionRatio
    },
    done: true
  };
}

export function validateInput(input) {
  if (!input.text || typeof input.text !== 'string') {
    throw new Error('Please provide text to encode');
  }
  if (input.text.length === 0) {
    throw new Error('Text cannot be empty');
  }
  if (input.text.length > 100) {
    throw new Error('Text too long (max 100 characters)');
  }
}
