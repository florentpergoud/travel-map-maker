import {useState} from 'react';
import {useCurrentFrame} from 'remotion';
import {getLabelPosition} from './utils/getLabelPosition';
import {getSecondPointPosition} from './utils/getSecondPointPosition';

const DEFAULT_COORDINATES: [[number, number], [number, number]] = [
	[0, 0],
	[0, 0],
];

export const useEnrichCoordinates = ({
	cities,
	pathAnimationFrameDuration,
}: {
	cities: Array<City>;
	pathAnimationFrameDuration: number;
}) => {
	const frame = useCurrentFrame();
	const [pixelCoordinates, setPixelCoordinates] = useState<Array<L.Point>>([]);

	const markerData = pixelCoordinates.map((coordinates, index) => {
		return {
			coordinates,
			name: cities[index].name,
			labelPosition: getLabelPosition({
				markerPosition: pixelCoordinates[index],
				previousMarkerPosition: pixelCoordinates[index === 0 ? 1 : 0],
			}),
		};
	});

	const animationAdvancement = Math.min(1, frame / pathAnimationFrameDuration);

	const pathPixelCoordinates: [[number, number], [number, number]] =
		pixelCoordinates.length > 0
			? [
					[pixelCoordinates[0].x, pixelCoordinates[0].y],
					getSecondPointPosition({
						firstPointPosition: pixelCoordinates[0],
						secondPointFinalPosition: pixelCoordinates[1],
						animationAdvancement,
					}),
			  ]
			: DEFAULT_COORDINATES;

	return {
		markerData,
		setPixelCoordinates,
		pathPixelCoordinates,
	};
};
