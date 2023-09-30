module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    "airbnb-base",
    "airbnb-typescript/base"
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  "rules": {
    "eol-last": [
      "error",
      "always"
    ],
    "import/no-cycle": 0,
    "import/prefer-default-export": 0,
    "import/no-unresolved": 0,
    "import/order": [
      "error",
      {
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        },
        "newlines-between": "always",
        "groups": [
          "builtin",
          "external",
          "internal",
          "sibling",
          "index",
          "parent"
        ]
      }
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "consistent-return": 0,
    "max-len": [
      "error",
      {
        "code": 120
      }
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": [
          "PascalCase"
        ],
        "custom": {
          "regex": "^I[A-Z]",
          "match": true
        }
      }
    ],
    "no-param-reassign": [
      2,
      {
        "props": false
      }
    ],
    "no-multiple-empty-lines": [
      2,
      {
        "max": 1,
        "maxEOF": 0,
        "maxBOF": 0
      }
    ],
    "no-duplicate-imports": [
      "error"
    ],
    "semi": [
      "error",
      "always"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "curly": "error",
    "@typescript-eslint/no-use-before-define": ["error", {
      "functions": false,
      "classes": true,
      "variables": true,
      "allowNamedExports": false
    }]
  }
};
