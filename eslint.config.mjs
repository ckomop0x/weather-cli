import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("airbnb-base"), {
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.browser,
            ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, "off"])),
            console: "readonly" // Ensure 'console' is recognized as a global variable
        },

        ecmaVersion: 12,
        sourceType: "module",
    },

    rules: {
        "import/extensions": 0,
        "import/no-unresolved": 0,
        "import/prefer-default-export": 0,
        "consistent-return": 0,
        "no-console": "off", // Add this rule to disable the no-console warnings
    },
}];
