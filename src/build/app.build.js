({
  appDir: "../",
  baseUrl: "scripts",
  dir: "../../app",
  mainConfigFile: "../scripts/main.js",
  fileExclusionRegExp: /(test(|s)|doc(|s)|example(|s)|jquery|underscore|backbone|bootstrap)/,
  // name: "main",
  modules: [
      { name: "jquery" },
      {
        name: "bootstrap",
        exclude: ["jquery"]
      },
      {
        name: "underscore",
        exclude: ["jquery"]
      },
      {
        name: "backbone",
        exclude: ["jquery","underscore"]
      },
      {
        name: "main",
        exclude: ["jquery","bootstrap","underscore","backbone","text"]
      }
    ],
  optimizeCss: "standard"
})
