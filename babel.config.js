module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        'root': ['./'],
        'alias': {
          'Assets': './src/Assets',
          'MemoryGame': './src/Components/MemoryGame',
          'Components': './src/Components',
          'Screens': './src/Screens',
          'Utils': './src/Utils',
        },
      },
    ],
  ],
};
