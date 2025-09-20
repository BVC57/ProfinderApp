const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for TypeScript path mapping
config.resolver.alias = {
  '@': './src',
  '@/components': './src/components',
  '@/screens': './src/screens',
  '@/navigation': './src/navigation',
  '@/store': './src/store',
  '@/types': './src/types',
  '@/utils': './src/utils',
  '@/services': './src/services',
  '@/constants': './src/constants',
  '@/hooks': './src/hooks',
};

module.exports = config;
