export const removeLocalUser = () => {
  localStorage.removeItem('vizual_user');
};

export const getLocalUser = () => {
  // grab localCart from localStorage
  const cachedCart = localStorage.getItem('vizual_user');
  // if so, use cached
  if (cachedCart) {
    console.log('user: Using cached!');
    return JSON.parse(cachedCart);
  }
  else {
    return null;
  }
};

export const addLocalUser = (payload): any[] => {
  const newCart = payload;
  localStorage.setItem(
    'vizual_user',
    JSON.stringify(newCart)
  );
  return newCart;

};
