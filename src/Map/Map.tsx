import {useState} from 'react';
import styled from 'styled-components';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {LeafletMap} from './LeafletMap';
import {CustomMarker} from './CustomMarker';
import {AnimatedPath} from './AnimatedPath';
import {AbsoluteFill} from 'remotion';

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
export const Map: React.FC = () => {
	const [pixelCoordinates, setPixelCoordinates] = useState<Array<L.Point>>([]);

	return (
		<Container>
			<LeafletMap
				coordinates={PROPS.cities.map((city) => city.coordinates)}
				setPixelCoordinates={setPixelCoordinates}
			/>

			<PathContainer>
				{pixelCoordinates.length > 0 && (
					<AnimatedPath
						orginCoords={pixelCoordinates[0]}
						destinationCoords={pixelCoordinates[1]}
					/>
				)}
			</PathContainer>
			<MarkersContainer>
				{pixelCoordinates.map((coordinate, index) => (
					<CustomMarker
						key={`point-${index}`}
						leftPixelCoord={coordinate.x}
						topPixelCoord={coordinate.y}
						titlePosition="top"
						title={PROPS.cities[index].name}
					/>
				))}
			</MarkersContainer>
		</Container>
	);
};

const Container = styled(AbsoluteFill)``;

const PathContainer = styled(AbsoluteFill)`
	z-index: 1;
`;

const MarkersContainer = styled(AbsoluteFill)`
	position: relative;
	z-index: 2;
`;
