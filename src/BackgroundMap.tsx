import {LatLngExpression} from 'leaflet';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import {MapContainer, Popup, Marker} from 'react-leaflet';
import {MapContent} from './MapContent';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const FIRST_COORD: LatLngExpression = [51.5073509, -0.12775829999998223];
const SECOND_COORD: LatLngExpression = [48.864716, 2.349014];

export const BackgroundMap: React.FC = () => {
	return (
		<div style={{flex: 1, backgroundColor: 'white'}}>
			<MapContainer
				center={FIRST_COORD as LatLngExpression}
				zoom={1}
				scrollWheelZoom={false}
				style={{height: '1920px', width: '1080px'}}
			>
				<MapContent
					firstCoordinates={FIRST_COORD}
					secondCoordinates={SECOND_COORD}
				/>

				<Marker position={FIRST_COORD}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
				<Marker position={SECOND_COORD} />
			</MapContainer>
		</div>
	);
};
