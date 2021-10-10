import React from 'react';
import styled from 'styled-components';

import {MapContainer} from 'react-leaflet';
import {MapContent} from './MapContent';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface Props {
	coordinates: Array<[number, number]>;
	setPixelCoordinates: (pixelCoordinates: L.Point[]) => void;
}

export const WrappedLeafletMap: React.FC<Props> = ({
	coordinates,
	setPixelCoordinates,
}) => {
	return (
		<MapIsolationContainer>
			<MapContainer
				zoom={1}
				scrollWheelZoom={false}
				style={{height: '1920px', width: '1080px'}}
				zoomControl={false}
			>
				<MapContent
					coordinates={coordinates}
					setPixelCoordinates={setPixelCoordinates}
				/>
			</MapContainer>
		</MapIsolationContainer>
	);
};

export const LeafletMap = React.memo(WrappedLeafletMap);

const MapIsolationContainer = styled.div`
	isolation: isolate;
`;
