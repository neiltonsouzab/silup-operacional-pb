import * as RNFS from 'react-native-fs';

import firebaseStorage from '@react-native-firebase/storage';

const storage = {
  async uploadFile(folder: string, filename: string): Promise<string> {
    try {
      const path = `${RNFS.ExternalCachesDirectoryPath}/images/${filename}`;

      const reference = firebaseStorage().ref(`/${folder}/${filename}`);

      await reference.putFile(path);

      return reference.getDownloadURL();
    } catch {
      throw new Error('upload-file-error');
    }
  },

  async deleteFile(filename: string): Promise<void> {
    try {
      const path = `${RNFS.ExternalCachesDirectoryPath}/images/${filename}`;

      await RNFS.unlink(path);
      await RNFS.scanFile(path);
    } catch {
      throw new Error('delete-file-error');
    }
  },
};

export default storage;
