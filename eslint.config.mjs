import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import stylistic from '@stylistic/eslint-plugin'
import unusedImports from 'eslint-plugin-unused-imports'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      '_demos/**',
      '_changelogs/**',
      '_zips/**',
      'public/**',
    ],
  },

  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
  ),
  stylistic.configs.recommended,
  {
    plugins: {
      'unused-imports': unusedImports,
    },
  },
  {
    rules: {

      // replace @typescript-eslint/no-unused-vars
      // with rules from unused-imports plugin
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['warn',
        {
          vars: 'local',

          // allow unused variables starting with underscores
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              // https://www.material-tailwind.com/docs/react/guide/next#with-server-components
              name: '@material-tailwind/react',
              message: 'Importing from @material-tailwind/react is not allowed. Instead use "@/components/material-tailwind-components"',
            },
          ],
        },
      ],
    },
  },
]

export default eslintConfig
