# next-office-generator

## Installation

Just run this command in your project `npm install next-office-generator`

## Prerequisites
- Prisma 2
- Prisma JSON Schema Generator
- Next.js
- Typescript 

|npm|link|
|---|---|
|prisma|https://www.npmjs.com/package/prisma|
|prisma-json-schema-generator|https://www.npmjs.com/package/prisma-json-schema-generator|
|next.js|https://www.npmjs.com/package/next|
|typescript|https://www.npmjs.com/package/typescript|
- 


## Configuration
### Step 1

Install this dependency: `npm install prisma-json-schema-generator -D`

### Step 2
Add the following code to your `schema.prisma` file, right after the `generator client` accordingly to the [documentation](https://github.com/valentinpalkovic/prisma-json-schema-generator)

```
generator jsonSchema {
  provider = "prisma-json-schema-generator"
  output   = "./generated/json"
}
```

### Step 3
Then run this command: `npx prisma generate` to generate the JSON schema. You might need to add a script in your package.json to run it.

Finally, run this command: `npx next-office-generator setup-next-office-generator`
### Step 4


### Step 5 
Check if the '**@**/prisma/prisma' (check your tsconfig.json)

```
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Roadmap
- https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c