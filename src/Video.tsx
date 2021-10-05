import {Composition} from 'remotion';
import {BackgroundMap} from './BackgroundMap';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Map"
				component={BackgroundMap}
				durationInFrames={150}
				fps={30}
				width={1080}
				height={1920}
			/>
		</>
	);
};
