export default {
  'thruster-liquidity': {
    type: 'pool',
    // feat#Jira https://dapdap.atlassian.net/browse/DAP-43
    parentConfig: 'swap/dapps/thruster-finance',
    theme: {
      '--button-color': 'linear-gradient(180deg, #FF8581 0%, #FE2B29 100%)',
      '--border-color': '#FE6360'
    }
  },
  'kim-exchange-liquidity': {
    type: 'pool',
    // feat#Jira https://dapdap.atlassian.net/browse/DAP-43
    parentConfig: 'swap/dapps/kim-exchange',
    theme: {
      '--button-color': '#FF4500',
      '--border-color': '#FF4500'
    }
  }
};
