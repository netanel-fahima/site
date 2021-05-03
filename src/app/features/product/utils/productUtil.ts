export const getImages = (str: any): any[] => {
  const imgs = [];
  const regex = /\"(?<Protocol>\w+):\/\/(?<Domain>[\w.]+\/?)\S*\"/gm;
  let m: RegExpExecArray;
  // tslint:disable-next-line:no-conditional-assignment
  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    // @ts-ignore
    imgs.push(m?.[0].replaceAll('"', ''));
    // The result can be accessed through the `m`-variable
  }
  //console.log(imgs);
  return imgs;
};

export const getImageName = (str: any): string => {
  return str.split('/')[str.split('/').length - 1].split('-')[0];
};

