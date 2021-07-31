/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

const options = {
  outdir: 'lib',
  bundle: true,
  sourcemap: true,
  platform: 'node',
  format: 'cjs',
  plugins: [nodeExternalsPlugin()],
};

void build({
  ...options,
  entryPoints: ['src/index.ts'],
});

void build({
  ...options,
  entryPoints: ['src/cli.ts'],
});
