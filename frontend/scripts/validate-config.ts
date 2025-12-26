#!/usr/bin/env tsx
// Config Validation Script
// Run this script to validate your portfolio configuration

import { portfolioConfig } from '../src/config/portfolio.config';
import { validateOnLoad } from '../src/utils/data/validation';

console.log('🔍 Validating portfolio configuration...\n');

const validation = validateOnLoad(portfolioConfig);

if (validation.success && validation.warnings.length === 0) {
  console.log('✅ Portfolio configuration is valid!\n');
  process.exit(0);
}

if (!validation.success) {
  console.error('❌ Validation failed:\n');
  validation.errors.forEach((error, index) => {
    console.error(`   ${index + 1}. ${error}`);
  });
  console.error('');
}

if (validation.warnings.length > 0) {
  console.warn('⚠️  Warnings:\n');
  validation.warnings.forEach((warning, index) => {
    console.warn(`   ${index + 1}. ${warning}`);
  });
  console.warn('');
}

if (!validation.success) {
  console.error('Please fix the errors above and try again.\n');
  process.exit(1);
}

console.log('✅ Configuration is valid (with warnings).\n');
process.exit(0);

