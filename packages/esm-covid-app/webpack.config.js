const path = require('path');
const config = (module.exports = require('openmrs/default-webpack-config'));
config.scriptRuleConfig.exclude = /(node_modules[^\/@openmrs\/esm\-patient\-common\-lib])/;
config.overrides.resolve = {
  extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss'],
  alias: {
    '@openmrs/esm-framework': '@openmrs/esm-framework/src/internal',
    'openmrs-esm-ohri-commons-lib': path.resolve(__dirname, '../esm-commons-lib/src/index'),
    'openmrs-ohri-form-engine-lib': 'openmrs-ohri-form-engine-lib/src/index',
  },
};
module.exports = config;
