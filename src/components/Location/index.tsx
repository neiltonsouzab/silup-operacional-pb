import React, { useEffect, useState } from 'react';

import { Container, Label, Address } from './styles';

import geolocation from '../../services/geolocation';

interface LocationProps {
  latitude: number;
  longitude: number;
}

const Location: React.FC<LocationProps> = ({ latitude, longitude }) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    geolocation
      .getAddress(latitude, longitude)
      .then(({ full_address }) => setAddress(full_address))
      .catch(() => setAddress(''));
  }, [latitude, longitude]);

  return (
    <Container>
      <Label>SUA LOCALIZAÇÃO</Label>
      <Address>
        {address || `Latitude: ${latitude}, Longitude: ${longitude}`}
      </Address>
    </Container>
  );
};

export default Location;
