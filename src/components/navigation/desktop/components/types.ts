import type { MedalType } from "@/views/Profile/types";

export enum CheckInStatus {
    claim = 'claim',
    claimed = 'claimed',
    will_claim = 'will_claim',
}

export interface IDayStatus {
    day: number;
    status: CheckInStatus;
    today?: boolean;
}

// export interface IMedal {
//     id: number;
//     category: string;
//     medal_category: string;
//     medal_name: string;
//     relate: number;
//     level: number;
//     level_name: string;
//     level_description: string;
//     threshold: number;
//     trading_volume: number;
//     trading_type: string | null;
//     chain_id: number;
//     logo: string;
//     gem: number;
//     online: number;
// }

export interface ICheckInData {
    total_days: number;
    consecutive_days: number;
    data: IDayStatus[];
    medal: MedalType;
    currentDay: string;
}
