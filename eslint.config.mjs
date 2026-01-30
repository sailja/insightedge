import js from "@eslint/js";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const config = [js.configs.recommended, ...nextVitals, ...nextTs, prettier];

export default config;
