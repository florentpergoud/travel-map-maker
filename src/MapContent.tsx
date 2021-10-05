import {useState} from 'react';
import {delayRender} from 'remotion';
import {continueRender} from 'remotion';
import {useMap} from 'react-leaflet';
import {MAPS} from './constants';
import L from 'leaflet';

interface Props {
	firstCoordinates: [number, number];
	secondCoordinates: [number, number];
}

export const MapContent = ({firstCoordinates, secondCoordinates}: Props) => {
	const map = useMap();
	const [handle] = useState(() => delayRender());

	const selectedMap = MAPS.stadia;
	const tileLayer = L.tileLayer(selectedMap.url, {
		attribution: selectedMap.attribution,
	});
	tileLayer.addTo(map);

	const onMapLoad = () => {
		continueRender(handle);

		console.log('tiles loaded');
	};

	tileLayer.on('load', onMapLoad);
	map.fitBounds([firstCoordinates, secondCoordinates], {padding: [150, 150]});
	return null;
};
