export const getLabelPosition = ({
	markerPosition,
	previousMarkerPosition,
}: {
	markerPosition: L.Point;
	previousMarkerPosition: L.Point;
}): 'left' | 'right' => {
	const isMarkerRightOfPrevious = markerPosition.x > previousMarkerPosition.x;

	return isMarkerRightOfPrevious ? 'right' : 'left';
};
