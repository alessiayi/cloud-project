module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:react/recommended",
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion:  2020,
    sourceType: "module"
  },
  settings: {
    "react": {
      "version": "detect",
    },
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        trailingComma: "none"
      }
    ]
  }
};
