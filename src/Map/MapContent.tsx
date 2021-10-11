import {useState} from 'react';
import {delayRender} from 'remotion';
import {continueRender} from 'remotion';
import {useMap, TileLayer} from 'react-leaflet';
import {MAPS} from '../constants';
import L from 'leaflet';

interface Props {
	coordinates: Array<[number, number]>;
	setPixelCoordinates: (pixelCoordinates: L.Point[]) => void;
}

const selectedMap = MAPS.stadia;

const updatePixelCoordinates = (
	map: L.Map,
	coordinates: Array<[number, number]>,
	setPixelCoordinates: (pixelCoordinates: L.Point[]) => void
) => {
	const pixelCoordinates = coordinates.map((coordinates) => {
		return map.latLngToContainerPoint(coordinates);
	});

	setPixelCoordinates(pixelCoordinates);
};

export const MapContent: React.FC<Props> = ({
	coordinates,
	setPixelCoordinates,
}: Props) => {
	const map = useMap();
	const [handle] = useState(() => delayRender());

	const onMapLoad = () => {
		continueRender(handle);
		updatePixelCoordinates(map, coordinates, setPixelCoordinates);
	};

	map.on('load', onMapLoad);

	map.on('move', () => {
		updatePixelCoordinates(map, coordinates, setPixelCoordinates);
	});

	map.fitBounds(coordinates, {
		padding: [100, 100],
	});

	return (
		<TileLayer attribution={selectedMap.attribution} url={selectedMap.url} />
	);
};
