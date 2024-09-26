import useToast from '@/hooks/useToast';
import useUserInfo from '@/hooks/useUserInfo';
import { postUpload } from '@/utils/http';

export default function Upload() {
  const { queryUserInfo } = useUserInfo();
  const { success, fail } = useToast();

  return (
    <input
      accept=".jpg, .jpeg, .png, .gif, .svg, .webp"
      type="file"
      onChange={async (e: any) => {
        if (e.target.files.length === 0) {
          return false;
        }

        const file = e.target.files[0];
        console.log('file:', e.target.files[0]);

        const formData = new FormData();
        formData.append('file', file);

        const resp = await postUpload('/api/user/avatar', formData);

        if (resp.code === 0) {
          queryUserInfo();
          success({
            title: 'Upload Success'
          });
        } else {
          fail({
            title: 'Upload Failed'
          });
        }
      }}
      className="input-file"
    />
  );
}
