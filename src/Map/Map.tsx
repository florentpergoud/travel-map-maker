import {useMemo, useState} from 'react';
import styled from 'styled-components';
import {LatLngExpression} from 'leaflet';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {LeafletMap} from './LeafletMap';

const FIRST_COORD: LatLngExpression = [51.5073509, -0.12775829999998223];
const SECOND_COORD: LatLngExpression = [48.864716, 2.349014];

const coordinates = [FIRST_COORD, SECOND_COORD];

export const Map: React.FC = () => {
	const [pixelCoordinates, setPixelCoordinates] = useState<Array<L.Point>>([]);

	return (
		<Container>
			<LeafletMap
				coordinates={coordinates}
				setPixelCoordinates={setPixelCoordinates}
			/>
			{pixelCoordinates.map((coordinate, index) => (
				<Circle
					key={`point-${index}`}
					leftPixel={coordinate.x}
					topPixel={coordinate.y}
				/>
			))}
		</Container>
	);
};

const Container = styled.div``;

const Circle = styled.div<{leftPixel: number; topPixel: number}>`
	position: absolute;
	left: ${({leftPixel}) => leftPixel}px;
	top: ${({topPixel}) => topPixel}px;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: red;
	z-index: 100;
`;
