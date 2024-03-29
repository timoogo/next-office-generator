import * as esbuild from 'esbuild';
import type {BuildOptions} from 'esbuild/lib/main';

const outdir = 'dist';

const commonConfig = {
  bundle: true,
  sourcemap: true,
  minify: false,
  metafile: true,
};

async function main() {
  console.time('⚡ Build complete! ⚡');

  const esbuildEsmConfig: BuildOptions = {
    entryPoints: ['src/index.tsx'],
    outfile: `${outdir}/index.esm.js`,
    jsx: 'transform',
    ...commonConfig,
    format: 'cjs',
    treeShaking: true,
    target: 'es2018',
    external: ['next', 'react', 'react-dom'],
    platform: 'neutral',
  };

  const esbuildConfig = Object.assign({}, esbuildEsmConfig);
  delete esbuildConfig.platform;
  esbuildConfig.outfile = `${outdir}/index.js`;

  await esbuild.build(esbuildEsmConfig);
  await esbuild.build(esbuildConfig);

  console.timeEnd('⚡ Build complete! ⚡');
}

main().then(() => {
  console.log('Done');
}).catch(error => {
  console.error(error);
});
