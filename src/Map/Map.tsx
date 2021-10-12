import styled from 'styled-components';

import 'leaflet/dist/leaflet.css';

import {LeafletMap} from './LeafletMap';
import {CustomMarker} from './CustomMarker';
import {AnimatedPath} from './AnimatedPath';
import {AbsoluteFill} from 'remotion';
import {useEnrichCoordinates} from './useEnrichCoordinates.ts';

interface Props {
	cities: Array<City>;
	pathAnimationFrameDuration: number;
}

export const Map: React.FC<Props> = ({cities, pathAnimationFrameDuration}) => {
	const {markerData, setPixelCoordinates, pathPixelCoordinates} =
		useEnrichCoordinates({cities, pathAnimationFrameDuration});

	return (
		<Container>
			<LeafletMap
				coordinates={cities.map((city) => city.coordinates)}
				setPixelCoordinates={setPixelCoordinates}
			/>

			<PathContainer>
				{pathPixelCoordinates && (
					<AnimatedPath
						orginCoords={pathPixelCoordinates[0]}
						destinationCoords={pathPixelCoordinates[1]}
					/>
				)}
			</PathContainer>
			<MarkersContainer>
				{markerData.map((marker, index) => (
					<CustomMarker
						key={`point-${index}`}
						leftPixelCoord={marker.coordinates.x}
						topPixelCoord={marker.coordinates.y}
						titlePosition={marker.labelPosition}
						title={cities[index].name}
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
