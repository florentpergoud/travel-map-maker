import {useState} from 'react';
import {useCurrentFrame} from 'remotion';

export const useEnrichCoordinates = ({
	cities,
	pathAnimationFrameDuration,
}: {
	cities: Array<City>;
	pathAnimationFrameDuration: number;
}) => {
	const frame = useCurrentFrame();
	const [pixelCoordinates, setPixelCoordinates] = useState<Array<L.Point>>([]);

	const enrichedData = pixelCoordinates.map((coordinates, index) => {
		return {
			coordinates,
			name: cities[index].name,
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
			: [
					[0, 0],
					[0, 0],
			  ];

	return {
		enrichedData,
		setPixelCoordinates,
		pathPixelCoordinates,
	};
};

const getSecondPointPosition = ({
	firstPointPosition,
	secondPointFinalPosition,
	animationAdvancement,
}: {
	firstPointPosition: L.Point;
	secondPointFinalPosition: L.Point;
	animationAdvancement: number;
}): [number, number] => {
	const xDelta = Math.abs(secondPointFinalPosition.x - firstPointPosition.x);
	const yDelta = Math.abs(secondPointFinalPosition.y - firstPointPosition.y);
	const isSecondPointXGreaterThanFirst =
		secondPointFinalPosition.x > firstPointPosition.x;

	const isSecondPointYGreaterThanFirst =
		secondPointFinalPosition.y > firstPointPosition.y;

	const xPos = isSecondPointXGreaterThanFirst
		? firstPointPosition.x + xDelta * animationAdvancement
		: firstPointPosition.x - xDelta * animationAdvancement;
	const yPos = isSecondPointYGreaterThanFirst
		? firstPointPosition.y + yDelta * animationAdvancement
		: firstPointPosition.y - yDelta * animationAdvancement;
	return [xPos, yPos];
};
