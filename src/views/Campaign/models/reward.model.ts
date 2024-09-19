export interface Reward {
  round: number;
  reward_time: number;
  amount: number;
  // Has the lottery draw already taken place
  is_draw_completed: boolean;
  // Lottery numbers
  // When is_draw_completed is true, the voucher has a value
  voucher: string;
  // Number of winners
  winners: number;
  // User's winning tickets, separated by commas
  user_reward_voucher: string;
  // User's winning amount
  user_reward_amount: string;
}
