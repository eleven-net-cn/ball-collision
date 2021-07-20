module.exports = {
  assumptions: {
    /**
     * https://babeljs.io/docs/en/assumptions#setpublicclassfields
     *
     * 装饰器的 legancy: true，依赖此配置
     *  - https://babeljs.io/docs/en/babel-plugin-proposal-decorators#legacy
     */
    setPublicClassFields: true,
  },
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
    ['@babel/plugin-proposal-class-properties'],
  ],
};
