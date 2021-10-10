import React from 'react';
import styled from 'styled-components';

interface Props {
	orginCoords: [number, number];
	destinationCoords: [number, number];
}

export const AnimatedPath: React.FC<Props> = ({
	orginCoords,
	destinationCoords,
}) => {
	return (
		<Container>
			<svg xmlns="http://www.w3.org/2000/svg">
				<StyledPath
					d={`M${orginCoords[0]} ${orginCoords[1]} L ${destinationCoords[0]} ${destinationCoords[1]}`}
				/>
			</svg>
		</Container>
	);
};

const Container = styled.svg`
	height: 100%;
	width: 100%;
	position: absolute;
	z-index: 1;
`;

const StyledPath = styled.path`
	stroke: black;
	stroke-width: 8;
	stroke-linecap: round;
	stroke-dasharray: 40; /* this is the entire length of the line */
	stroke-dashoffset: 0; /* this is the entire length of the line */
`;
