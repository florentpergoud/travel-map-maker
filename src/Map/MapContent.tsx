import styled from 'styled-components';
import {useState} from 'react';
import {delayRender} from 'remotion';
import {continueRender} from 'remotion';
import {useMap} from 'react-leaflet';
import {MAPS} from '../constants';
import L from 'leaflet';

interface Props {
	coordinates: Array<[number, number]>;
	setPixelCoordinates: (pixelCoordinates: L.Point[]) => void;
}

export const MapContent = ({coordinates, setPixelCoordinates}: Props) => {
	const map = useMap();
	const [handle] = useState(() => delayRender());

	const selectedMap = MAPS.stadia;
	const tileLayer = L.tileLayer(selectedMap.url, {
		attribution: selectedMap.attribution,
	});
	tileLayer.addTo(map);

	const updatePixelCoordinates = () => {
		const pixelCoordinates = coordinates.map((coordinates) => {
			return map.latLngToContainerPoint(coordinates);
		});

		setPixelCoordinates(pixelCoordinates);
	};

	const onMapLoad = () => {
		continueRender(handle);
		updatePixelCoordinates();
	};

	tileLayer.on('load', onMapLoad);
	map.on('move', () => {
		updatePixelCoordinates();
	});
	map.fitBounds(coordinates, {
		padding: [100, 100],
	});

	return null;
};
