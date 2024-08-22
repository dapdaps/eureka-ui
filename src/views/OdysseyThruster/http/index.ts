import _ from 'lodash';

import { get, post } from '@/utils/http';

const COMPASS_SPIN_URL = '/api/compass/spin';
const COMPASS_CLAIN_URL = '/api/compass/claim';
const COMPASS_SAVE_SOURCE_URL = '/api/compass/source';
const COMPASS_CHECK_QUEST_URL = '/api/compass/check_quest';

export async function postSpin(id: string) {
  return post(COMPASS_SPIN_URL, { id });
}

export async function postClaim(id: string) {
  return post(COMPASS_CLAIN_URL, { id });
}

export async function saveSource(quest_id: number) {
  return post(COMPASS_SAVE_SOURCE_URL, { quest_id });
}

export async function checkQuest(id: number) {
  return get(COMPASS_CHECK_QUEST_URL, { id });
}

export default {};
