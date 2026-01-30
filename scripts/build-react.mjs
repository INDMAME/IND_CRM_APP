import { build } from "esbuild";

const isProd = process.argv.includes("--prod");

const entryPoints = {
  create: "Web/wwwroot/react/src/pages/visitas/creacion/CreatePage.tsx",
  detail: "Web/wwwroot/react/src/pages/visitas/detail/DetailPage.tsx",
  history: "Web/wwwroot/react/src/pages/visitas/historial/HistoryPage.tsx",
  "ind-text-editor": "Web/wwwroot/react/src/pages/system/TextEditor.tsx",
  "audio-recorder": "Web/wwwroot/react/src/pages/system/AudioRecorder.tsx",
  "ind-audio-worklet": "Web/wwwroot/react/audio-recorder/ind-audio-worklet.ts",
};

await build({
  entryPoints,
  bundle: true,
  outdir: "Web/wwwroot/js",
  entryNames: "[name]",
  sourcemap: isProd ? true : "inline",
  minify: isProd,
  jsx: "automatic",
  loader: { ".ts": "ts", ".tsx": "tsx" },
});
