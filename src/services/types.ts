interface SendFeedback {
  totalSuccess: number;
  totalError: number;
}

interface ReceiveFeedback {
  totalSuccess: number;
  hasError: boolean;
}

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

interface OcurrenceTypeResponse {
  status: boolean;
  st: number;
  data: OcurrenceTypeResponseData[];
}

interface OcurrenceTypeResponseData {
  id: number;
  nometipoocorrencia: string;
}

interface CreateOcurrenceProps {
  id: string;
  obs: string;
  latitude: number;
  longitude: number;
  image_name: string;
  error: boolean;
  error_message: string;
  ocurrence_type_id: number;
}

export {
  SendFeedback,
  ReceiveFeedback,
  Address,
  AddressResponse,
  OcurrenceTypeResponse,
  OcurrenceTypeResponseData,
  CreateOcurrenceProps,
};
