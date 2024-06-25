import Spins from './Spins';

export default function LockStatus({ status, spins }: any) {
  return (
    <Spins spin={spins} active={status} style={{ position: 'inherit', borderColor: '#3d405a', borderRadius: 4 }} />
  );
}
