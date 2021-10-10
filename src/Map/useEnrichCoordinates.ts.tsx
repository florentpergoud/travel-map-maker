import {useState} from 'react';

export const useEnrichCoordinates = ({cities}: {cities: Array<City>}) => {
	const [pixelCoordinates, setPixelCoordinates] = useState<Array<L.Point>>([]);

	const enrichedData = pixelCoordinates.map((coordinates, index) => {
		return {
			coordinates,
			name: cities[index].name,
		};
	});

	return {
		enrichedData,
		setPixelCoordinates,
	};
};
