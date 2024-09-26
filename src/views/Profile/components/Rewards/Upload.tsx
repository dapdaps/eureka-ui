import useToast from '@/hooks/useToast';
import useUserInfo from '@/hooks/useUserInfo';
import { postUpload } from '@/utils/http';

function base64ToBlob(base64Data: string) {
  const dataArr: any = base64Data.split(',');
  const imageType = dataArr[0].match(/:(.*?);/)[1];
  const textData = window.atob(dataArr[1]);
  const arrayBuffer = new ArrayBuffer(textData.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < textData.length; i++) {
    uint8Array[i] = textData.charCodeAt(i);
  }
  return [new Blob([arrayBuffer], { type: imageType }), imageType.slice(6)];
}

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

        const url = await new Promise<string | void>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const res = reader.result;
            if (typeof res !== 'string') return resolve();
            resolve(res);
          };
          reader.readAsDataURL(file);
        });
        if (!url) return;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const img = new Image();
        const [naturalWidth, naturalHeight] = await new Promise<[number, number]>((resolve) => {
          img.onload = () => resolve([img.naturalWidth, img.naturalHeight]);
          img.src = url;
        });

        const width = Math.min(naturalWidth, naturalHeight);
        const sx = (naturalWidth - width) / 2;
        const sy = (naturalHeight - width) / 2;
        const canvasWidth = 256;
        canvas.width = canvasWidth;
        canvas.height = canvasWidth;
        ctx.drawImage(img, sx, sy, width, width, 0, 0, canvasWidth, canvasWidth);
        const base64Url = canvas.toDataURL('image/webp');

        const bloBData = base64ToBlob(base64Url);

        const formData = new FormData();
        formData.append('file', bloBData[0], bloBData[1]);

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
