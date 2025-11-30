import js from "@eslint/js";
import globals from "globals";

export default [
    {
        ignores: ["node_modules", "dist", "coverage"],
    },
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.node,
                ...globals.es2021,
                ...globals.jest,
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            "no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
            "no-console": "off", // Allow console.log in Node.js
            "no-undef": "error",
        },
    },
];
