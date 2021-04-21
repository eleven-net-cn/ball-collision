module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: {
          version: 3,
          proposals: true,
        },
        useESModules: true,
      },
    ],
    [
      // @babel/plugin-proposal-decorators 需要在 @babel/plugin-proposal-class-properties 之前
      '@babel/plugin-proposal-decorators',
      {
        legacy: true, // 推荐
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true, // babel 编译时，对 class 的属性采用赋值表达式，而不是 Object.defineProperty（更简洁）
      },
    ],
  ],
};
