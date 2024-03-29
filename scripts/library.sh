#!bin/bash

# Build Library
ts-node build.ts

tsc src/index.tsx --emitDeclarationOnly --declaration --outdir dist --esModuleInterop --jsx react-jsx

# tsc src/index.ts --emitDeclarationOnly --declaration --outfile dist/index.d.ts --esModuleInterop --jsx react-jsx
