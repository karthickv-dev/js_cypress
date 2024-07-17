import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { files: ["src/**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  {
    rules: {
      semi: ["error", "always"],
    },
  },
  {
    ignores: ["cypress/*","*.config.js","coverage/*","*.mjs"],
  },
  pluginJs.configs.recommended,
];
