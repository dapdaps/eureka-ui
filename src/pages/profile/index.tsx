import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import ProfileView from '@/views/Profile';

const ProfilePage: NextPageWithLayout = () => {
  return <ProfileView />;
};

ProfilePage.getLayout = useDefaultLayout;

export default ProfilePage;
