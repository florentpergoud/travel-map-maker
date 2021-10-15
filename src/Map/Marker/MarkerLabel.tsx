import {useVideoConfig} from 'remotion';
import React from 'react';
import styled from 'styled-components';
import {useFadeInAndOutOpacity} from '../../animationHooks/useFadeInAndOutOpacity';
import {useTranslate} from '../../animationHooks/useTranslate';

interface Props {
	titlePosition: 'left' | 'right' | 'top' | 'bottom';
	title: string;
}

export const MarkerLabel: React.FC<Props> = ({titlePosition, title}) => {
	const {fps} = useVideoConfig();

	const transitionInFrames = fps * 0.5;
	const durationInFrames = fps * 10;

	const opacity = useFadeInAndOutOpacity(transitionInFrames, durationInFrames);

	const translateX = useTranslate({from: 60, to: 0});

	return (
		<Container
			titlePosition={titlePosition}
			opacity={opacity}
			translateX={translateX}
		>
			<Title>{title}</Title>;
		</Container>
	);
};

const Container = styled.div<{
	titlePosition: string;
	opacity: number;
	translateX: number;
}>`
	background-color: black;
	position: absolute;
	${({titlePosition}) => titlePosition === 'left' && `right: 110%`};
	${({titlePosition}) => titlePosition === 'right' && `left: 112px`};
	${({titlePosition}) => titlePosition === 'bottom' && `top: 100px`};
	${({titlePosition}) => titlePosition === 'top' && `bottom: 100px`};
	height: 96px;
	padding-top: 24px;
	padding-left: 24px;
	padding-right: 24px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	opacity: ${({opacity}) => opacity};
	margin-top: ${({translateX}) => translateX}px;
`;

const Title = styled.span`
	font-family: 'Aveny T WEB';
	font-size: 60px;
	color: white;
	text-align: center;
`;
