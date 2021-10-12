export const getSecondPointPosition = ({
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
