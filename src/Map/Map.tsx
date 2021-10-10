import styled from 'styled-components';

import 'leaflet/dist/leaflet.css';

import {LeafletMap} from './LeafletMap';
import {CustomMarker} from './CustomMarker';
import {AnimatedPath} from './AnimatedPath';
import {AbsoluteFill} from 'remotion';
import {useEnrichCoordinates} from './useEnrichCoordinates.ts';

interface Props {
	cities: Array<City>;
}

export const Map: React.FC<Props> = ({cities}) => {
	const {enrichedData, setPixelCoordinates} = useEnrichCoordinates({cities});

	return (
		<Container>
			<LeafletMap
				coordinates={cities.map((city) => city.coordinates)}
				setPixelCoordinates={setPixelCoordinates}
			/>

			<PathContainer>
				{enrichedData.length > 0 && (
					<AnimatedPath
						orginCoords={enrichedData[0].coordinates}
						destinationCoords={enrichedData[1].coordinates}
					/>
				)}
			</PathContainer>
			<MarkersContainer>
				{enrichedData.map((enrichedData, index) => (
					<CustomMarker
						key={`point-${index}`}
						leftPixelCoord={enrichedData.coordinates.x}
						topPixelCoord={enrichedData.coordinates.y}
						titlePosition="top"
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
