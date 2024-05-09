import { arbitrum } from '@/config/tokens/arbitrum' 
import { avalanche } from '@/config/tokens/avalanche' 
import { base } from '@/config/tokens/base' 
import { bsc } from '@/config/tokens/bsc' 
import { ethereum } from '@/config/tokens/ethereum' 
import { gnosis } from '@/config/tokens/gnosis' 
import { linea } from '@/config/tokens/linea' 
import { manta } from '@/config/tokens/manta' 
import { mantle } from '@/config/tokens/mantle' 
import { metis } from '@/config/tokens/metis' 
import { mode } from '@/config/tokens/mode' 
import { optimism } from '@/config/tokens/optimism' 
import { polygon } from '@/config/tokens/polygon' 
import { polygonZkevm } from '@/config/tokens/polygonZkevm' 
import { scroll } from '@/config/tokens/scroll' 
import { zkSync } from '@/config/tokens/zkSync' 
import { blast } from '@/config/tokens/blast' 

import type { Token } from '@/types';

const allTokens: { [key: number]: Token[] } = {
    42161: Object.values(arbitrum),
    43114: Object.values(avalanche),
    8453: Object.values(base),
    56: Object.values(bsc),
    1: Object.values(ethereum),
    100: Object.values(gnosis),
    59144: Object.values(linea),
    169: Object.values(manta),
    5000: Object.values(mantle),
    1088: Object.values(metis),
    34443: Object.values(mode),
    137: Object.values(polygon),
    1101: Object.values(polygonZkevm),
    534352: Object.values(scroll),
    324: Object.values(zkSync),
    10: Object.values(optimism),
    81457: Object.values(blast),
}

export default allTokens