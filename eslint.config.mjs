import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const extendedConfigs = compat.extends(
  "next/core-web-vitals",
  "next/typescript"
);

// 🛠️ Override rules in every extended config
const patchedConfigs = extendedConfigs.map((config) => ({
  ...config,
  rules: {
    ...(config.rules || {}),
    "next/no-img-element": "off",
    "@next/next/no-img-element": "off",
  },
}));

const config = [
  ...patchedConfigs,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "react/no-unescaped-entities": "off",
    },
  },
];

export default config;
