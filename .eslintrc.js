module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: {
    browser: false,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: [
    "@typescript-eslint"
  ],
}
