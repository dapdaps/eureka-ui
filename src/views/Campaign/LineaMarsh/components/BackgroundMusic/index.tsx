import IconPlayBackgroundMusic from '@public/svg/campaign/linea-marsh/play.svg';
import IconStopBackgroundMusic from '@public/svg/campaign/linea-marsh/stop.svg';

import { useInteractiveSound } from '../../hooks/useInteractiveSound';

const BackgroundMusic = () => {
  const { playSound, pauseSound, isPlaying } = useInteractiveSound('/audios/marsh.wav', {
    loop: true,
    autoPlay: true,
    volume: 0.3
  });

  return (
    <div className="absolute right-[150px] top-[40px] hover:cursor-pointer">
      {isPlaying ? (
        <IconStopBackgroundMusic onClick={pauseSound} className="animate-spin" />
      ) : (
        <IconPlayBackgroundMusic onClick={playSound} />
      )}
    </div>
  );
};

export default BackgroundMusic;
