/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require('esbuild');

const options = {
  outdir: 'lib',
  bundle: true,
  external: ['@turf/helpers', 'fit-file-parser'],
  sourcemap: true,
  platform: 'node',
  format: 'cjs',
};

void build({
  ...options,
  entryPoints: ['src/index.ts'],
});

void build({
  ...options,
  entryPoints: ['src/cli.ts'],
});
