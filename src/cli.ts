#!/usr/bin/env node

import { readFile } from 'fs/promises';
import fit2geo from './index';

function handler(filePath: string): Promise<void> {
  return readFile(filePath).then(fit2geo).then(JSON.stringify).then(console.log);
}

const [,,fitFile] = process.argv;

if (typeof fitFile === 'string') {
  void handler(fitFile);
}
