

import liquidity from './modules/liquidity'
import birdge from './modules/bridge'
export default {
  dark: {
    ...liquidity["dark"],
    ...birdge["dark"]
  },
  light: {
    ...liquidity["light"],
    ...birdge["light"]
  }
}