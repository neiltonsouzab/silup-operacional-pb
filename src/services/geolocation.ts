import api from './api';

interface AddressComponent {
  long_name: string;
  short_name: string;
  type: string[];
}

interface Address {
  results: [
    {
      address_components: AddressComponent[];
      formatted_address: string;
    },
  ];
}

interface AddressResponse {
  number: string;
  route: string;
  district: string;
  city: string;
  state: string;
  full_address: string;
}

interface SearchAddressReponse {
  predictions: Array<{
    description: string;
  }>;
}

interface GetCoordsByAddressResponse {
  results: Array<{
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }>;
}

interface Coords {
  latitude: number;
  longitude: number;
}

const geolocation = {
  async getAddress(
    latitude: number,
    longitude: number,
  ): Promise<AddressResponse> {
    try {
      const { data } = await api.get<Address>(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            latlng: `${latitude},${longitude}`,
            result_type: 'street_address',
            key: 'AIzaSyACOiUf8qAOFGRCNV2En4ifiXWQt5wbHb8',
            language: 'pt',
          },
        },
      );

      const number = data.results[0].address_components[0].short_name;
      const route = data.results[0].address_components[1].long_name;
      const district = data.results[0].address_components[2].short_name;
      const city = data.results[0].address_components[3].short_name;
      const state = data.results[0].address_components[4].short_name;
      const full_address = data.results[0].formatted_address;

      return {
        number,
        route,
        district,
        city,
        state,
        full_address,
      };
    } catch {
      throw new Error('get-address-error');
    }
  },
  calcDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d;
  },
  async searchAddress(filter: string): Promise<string[]> {
    const response = await api.get<SearchAddressReponse>(
      'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      {
        params: {
          key: 'AIzaSyACOiUf8qAOFGRCNV2En4ifiXWQt5wbHb8',
          input: filter,
          language: 'pt',
        },
      },
    );

    const { predictions } = response.data;

    return predictions.map((prediction) => prediction.description);
  },
  async getCoordsByAddress(address: string): Promise<Coords> {
    const response = await api.get<GetCoordsByAddressResponse>(
      'https://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          address,
          key: 'AIzaSyACOiUf8qAOFGRCNV2En4ifiXWQt5wbHb8',
          language: 'pt',
        },
      },
    );

    const { results } = response.data;
    const { lat, lng } = results[0].geometry.location;

    return {
      latitude: lat,
      longitude: lng,
    };
  },
};

export default geolocation;
