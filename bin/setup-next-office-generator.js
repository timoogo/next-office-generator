#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

// Pages & API
if (!fs.existsSync('pages')) {
  fs.mkdirSync('pages');
}

console.log('Copying the pages and api');
if (!fs.existsSync('pages/admin')) {
  fs.mkdirSync('pages/admin');
}

fs.copyFileSync(path.resolve(__dirname, '../templates/pages/admin/index.txt'), 'pages/admin/index.tsx');

if (!fs.existsSync('pages/admin/[entity]')) {
  fs.mkdirSync('pages/admin/[entity]');
}

if (!fs.existsSync('pages/admin/[entity]/edit')) {
  fs.mkdirSync('pages/admin/[entity]/edit');
}

fs.copyFileSync(path.resolve(__dirname, '../templates/pages/admin/[entity]/edit.txt'), 'pages/admin/[entity]/edit/[id].tsx');

if (!fs.existsSync('pages/admin/[entity]/read')) {
  fs.mkdirSync('pages/admin/[entity]/read');
}

fs.copyFileSync(path.resolve(__dirname, '../templates/pages/admin/[entity]/read.txt'), 'pages/admin/[entity]/read/[id].tsx');

fs.copyFileSync(path.resolve(__dirname, '../templates/pages/admin/[entity]/create.txt'), 'pages/admin/[entity]/create.tsx');
fs.copyFileSync(path.resolve(__dirname, '../templates/pages/admin/[entity]/list.txt'), 'pages/admin/[entity]/index.tsx');

if (!fs.existsSync('pages/api')) {
  fs.mkdirSync('pages/api');
}

fs.copyFileSync(path.resolve(__dirname, '../templates/routes/api/[entity].txt'), 'pages/api/[entity].ts');

console.log('Visit http://localhost:3000/admin and try out your freshly created admin :)');
