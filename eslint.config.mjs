import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "_demos/**",
      "_changelogs/**",
      "_zips/**",
      "public/**",
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@material-tailwind/react',
              message: 'Importing from @material-tailwind/react is not allowed. Instead use "@/components/material-tailwind-components"'
            }
          ]
        }
      ]
    },
  },
];

export default eslintConfig;
