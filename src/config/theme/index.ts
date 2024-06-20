

import liquidity from './modules/liquidity'
import birdge from './modules/bridge'
export default {
  drak: {
    ...liquidity["drak"],
    ...birdge["drak"]
  },
  light: {
    ...liquidity["light"],
    ...birdge["light"]
  }
}