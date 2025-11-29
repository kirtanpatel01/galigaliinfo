// eslint.config.mjs
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    // Make ESLint match **nothing**
    files: ["__never_match_anything__.js"],
  },
]);
