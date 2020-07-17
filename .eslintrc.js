module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jquery": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "spellcheck"
    ],
    "rules": {
        // we only want double quotes
        "quotes": ["error", "double"],
        // we want to force semicolons
        "semi": ["error", "always"],
        // we use 4 spaces to indent our code
        "indent": ["error", 4],
        // we want to avoid useless spaces
        "no-multi-spaces": ["error"],
        // 
        "camelcase": "error",

        "spellcheck/spell-checker": [1, {
            "skipWords": [
                "endregion",
            ]
        }]
    }
};