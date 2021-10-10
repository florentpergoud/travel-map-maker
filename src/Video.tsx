import {Composition} from 'remotion';
import {Map} from './Map/Map';
import '../assets/font.css';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Map"
				component={Map}
				durationInFrames={150}
				fps={30}
				width={1080}
				height={1920}
			/>
		</>
	);
};
