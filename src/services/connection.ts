import NetInfo from '@react-native-community/netinfo';

const isConnected = async (): Promise<boolean | null | undefined> => {
  const net = await NetInfo.fetch();

  return net.isInternetReachable;
};

export default {
  isConnected,
};
