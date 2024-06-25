import Spins from './Spins';

export default function LockStatus({ status, spins, onRefresh, checking }: any) {
  return (
    <Spins
      spin={spins}
      checking={checking}
      onRefresh={onRefresh}
      active={status}
      style={{ position: 'inherit', borderColor: '#3d405a', borderRadius: 4 }}
    />
  );
}
