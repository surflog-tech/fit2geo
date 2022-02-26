import { build, BuildOptions }  from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

const options = {
  outdir: 'lib',
  bundle: true,
  sourcemap: true,
  platform: 'node',
  minify: true,
  plugins: [nodeExternalsPlugin()],
} as BuildOptions;

void build({
  ...options,
  entryPoints: ['src/index.ts'],
});

void build({
  ...options,
  entryPoints: ['src/cli.ts'],
});
