module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@assets': './src/assets',
          '@api': './src/api',
          '@components': './src/components',
          '@hooks': './src/hooks',
          // '@i18n': './src/i18n',
          '@navigation': './src/navigation',
          '@providers': './src/providers',
          '@screens': './src/screens',
          '@store': './src/store',
          '@themes': './src/themes',
          '@utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
