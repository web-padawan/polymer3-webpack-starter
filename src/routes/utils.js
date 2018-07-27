export const onLocationChanged = listener => {
  window.addEventListener('vaadin-router-location-changed', listener);
};

export const navigateTo = url => {
  window.dispatchEvent(
    new CustomEvent('vaadin-router-go', { detail: { pathname: url } })
  );
};
