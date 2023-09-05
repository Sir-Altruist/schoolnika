/* eslint-disable @typescript-eslint/no-var-requires */
/** This file allows settings in tsconfig.paths.json file to work in production */
/** I am using the settings in the tsconfig.paths.json to import files dynamically and avoid the relative or absolute path method */

// import { compilerOptions } from "./tsconfig.paths.json";
// import { register } from "tsconfig-paths";

const { register } = require("tsconfig-paths");
const { compilerOptions } = require("./tsconfig.paths.json");

const baseUrl = "./dist";
register({
    baseUrl,
    paths: compilerOptions.paths,
});
