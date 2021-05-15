export const scrollToTop = () => {
  const interval = setInterval(() => {
    window.scrollTo(window.scrollX - 10, window.scrollY - 10);
    if (!window.scrollX && !window.scrollY) {
      clearInterval(interval);
    }
  }, 1);
};
