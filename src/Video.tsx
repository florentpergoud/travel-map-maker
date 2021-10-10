import {Composition} from 'remotion';
import {Map} from './Map/Map';
import '../assets/font.css';

const PROPS = {
	cities: [
		{
			name: 'London',
			coordinates: [51.5073509, -0.12775829999998223] as [number, number],
		},
		{
			name: 'Paris',
			coordinates: [48.864716, 2.349014] as [number, number],
		},
	],
};

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
				defaultProps={{cities: PROPS.cities, pathAnimationFrameDuration: 60}}
			/>
		</>
	);
};
