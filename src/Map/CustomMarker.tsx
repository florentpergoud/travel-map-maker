import React from 'react';
import styled from 'styled-components';
import {FaMapMarkerAlt} from 'react-icons/fa';
import {IconContext} from 'react-icons';

interface Props {
	leftPixelCoord: number;
	topPixelCoord: number;
	titlePosition: 'top' | 'bottom' | 'left' | 'right';
	title: string;
}

export const CustomMarker: React.FC<Props> = ({
	leftPixelCoord,
	topPixelCoord,
	titlePosition,
	title,
}) => {
	return (
		<Container
			leftPixel={leftPixelCoord}
			topPixel={topPixelCoord}
			titlePosition="left"
		>
			{(titlePosition === 'left' || titlePosition === 'top') && (
				<Title titlePosition={titlePosition}>{title}</Title>
			)}
			<IconContext.Provider
				value={{color: '#962fbf', className: 'global-class-name'}}
			>
				<Icon />
			</IconContext.Provider>
			{(titlePosition === 'right' || titlePosition === 'bottom') && (
				<Title titlePosition={titlePosition}>{title}</Title>
			)}
		</Container>
	);
};

const Container = styled.div<{
	leftPixel: number;
	topPixel: number;
	titlePosition: string;
}>`
	position: absolute;
	left: ${({leftPixel}) => leftPixel - 50}px;
	top: ${({topPixel}) => topPixel - 100}px;
	display: flex;
	flex-direction: ${({titlePosition}) =>
		titlePosition === 'left' || titlePosition === 'right' ? 'row' : 'column'};
	align-items: center;
	justify-content: center;
`;

const Icon = styled(FaMapMarkerAlt)`
	width: 100px;
	height: 100px;
`;

const Title = styled.h2<{
	titlePosition: string;
}>`
	position: absolute;
	${({titlePosition}) => titlePosition === 'left' && `right: 110%`};
	${({titlePosition}) => titlePosition === 'right' && `left: 112px`};
	${({titlePosition}) => titlePosition === 'bottom' && `top: 100px`};
	${({titlePosition}) => titlePosition === 'top' && `bottom: 100px`};
	font-family: 'Aveny T WEB';
	font-size: 60px;
`;
