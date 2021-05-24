export const getImageName = (str: any): string => {
  return str.split('/')[str.split('/').length - 1].split('.')[0];
};

