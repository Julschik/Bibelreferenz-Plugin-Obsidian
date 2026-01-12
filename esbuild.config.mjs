import esbuild from "esbuild";
import process from "process";
import { copyFileSync, watch } from "fs";

const prod = process.argv[2] === "production";
const pluginDir = "Bible Dev/.obsidian/plugins/bible-reference-mapper";

// Copy static files to plugin directory
function copyToPlugin() {
  copyFileSync("manifest.json", `${pluginDir}/manifest.json`);
  copyFileSync("styles.css", `${pluginDir}/styles.css`);
}

const context = await esbuild.context({
  entryPoints: ["src/main.ts"],
  bundle: true,
  external: [
    "obsidian",
    "electron",
    "@codemirror/autocomplete",
    "@codemirror/collab",
    "@codemirror/commands",
    "@codemirror/language",
    "@codemirror/lint",
    "@codemirror/search",
    "@codemirror/state",
    "@codemirror/view",
    "@lezer/common",
    "@lezer/highlight",
    "@lezer/lr"
  ],
  format: "cjs",
  target: "es2018",
  outfile: `${pluginDir}/main.js`,
  sourcemap: prod ? false : "inline",
  minify: prod,
  treeShaking: true,
  logLevel: "info",
});

if (prod) {
  await context.rebuild();
  copyToPlugin();
  // Also keep a copy in root for git
  copyFileSync(`${pluginDir}/main.js`, "main.js");
  await context.dispose();
} else {
  copyToPlugin();
  await context.watch();

  // Watch styles.css for changes (debounced)
  let cssDebounce = false;
  watch("styles.css", () => {
    if (cssDebounce) return;
    cssDebounce = true;
    setTimeout(() => {
      copyFileSync("styles.css", `${pluginDir}/styles.css`);
      console.log("styles.css copied");
      cssDebounce = false;
    }, 500);
  });

  console.log("Watching for changes...");
}
