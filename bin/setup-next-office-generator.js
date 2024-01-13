#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log('Copying the pages and api');
if (!fs.existsSync('pages/admin')) {
    fs.mkdirSync('pages/admin');
}
if (!fs.existsSync('pages/admin/[entity]')) {
    fs.mkdirSync('pages/admin/[entity]');
}
if (!fs.existsSync('pages/admin/[entity]/edit')) {
    fs.mkdirSync('pages/admin/[entity]/edit');
}

fs.copyFileSync(path.resolve(__dirname, '../pages/admin/[entity]/edit/[id].tsx'), 'pages/admin/[entity]/edit/[id].tsx');
if (!fs.existsSync('pages/admin/[entity]/read')) {
    fs.mkdirSync('pages/admin/[entity]/read');
}
fs.copyFileSync(path.resolve(__dirname, '../pages/admin/[entity]/read/[id].tsx'), 'pages/admin/[entity]/read/[id].tsx');
fs.copyFileSync(path.resolve(__dirname, '../pages/admin/[entity]/create.tsx'), 'pages/admin/[entity]/create.tsx');
fs.copyFileSync(path.resolve(__dirname, '../pages/admin/[entity]/index.tsx'), 'pages/admin/[entity]/index.tsx');
if (!fs.existsSync('pages/api')) {
    fs.mkdirSync('pages/api');
}
fs.copyFileSync(path.resolve(__dirname, '../pages/api/[entity].ts'), 'pages/api/[entity].ts');

console.log('Copying prisma singleton');
if (!fs.existsSync('prisma')) {
    throw new Error('You must have a prisma folder at the root of your project to continue.');
}
fs.copyFileSync(path.resolve(__dirname, '../prisma/prisma.ts'), 'prisma/prisma.ts');

console.log('Visit http://localhost:3000/admin and try out your freshly created admin :)');