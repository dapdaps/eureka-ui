import { memo, useEffect, useState } from "react";

import { QUEST_PATH } from '@/config/quest';
import { ellipsAccount } from '@/utils/account';
import { get } from '@/utils/http';

import { useRouter } from "next/router";
import * as Styles from './styles';
export default memo(function KolUserInfo() {
  const router = useRouter()
  const [kolAvatar, setKolAvatar] = useState('');
  const [kolAddr, setKolAddr] = useState('');
  const kolName = router.query.kolName;
  async function getKolInfo() {
    const res: any = await get(`${QUEST_PATH}/api/activity/kol`, { name: kolName });

    if ((res.code as number) !== 0) return;
    const { address, avatar } = res.data;
    setKolAddr(address);
    setKolAvatar(avatar);
  }
  useEffect(() => {
    if (kolName) {
      getKolInfo();
    }
  }, [kolName]);
  return (
    <Styles.Inviter>
      {kolAvatar ? <Styles.InviterAvatar src={kolAvatar} /> : <Styles.InviterAvatarHold></Styles.InviterAvatarHold>}
      <Styles.InviterContent>
        <Styles.InviterTitle>{kolName}</Styles.InviterTitle>
        <Styles.InviterAddr>{ellipsAccount(kolAddr)}</Styles.InviterAddr>
      </Styles.InviterContent>
    </Styles.Inviter>
  )
})