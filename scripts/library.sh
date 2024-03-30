#!bin/bash

# Build Library
ts-node build.ts

# Build types
tsc src/index.tsx --emitDeclarationOnly --declaration --outdir dist --esModuleInterop --jsx react-jsx

# Build CSS
npx tailwindcss -i src/styles/globals.css -o dist/index.css --minify
