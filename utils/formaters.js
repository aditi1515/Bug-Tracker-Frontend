function formatNumber(number) {
  if (number >= 1e12) {
      return (number / 1e12).toFixed(2) + 'T'; // Trillions
  } else if (number >= 1e9) {
      return (number / 1e9).toFixed(2) + 'B'; // Billions
  } else if (number >= 1e6) {
      return (number / 1e6).toFixed(2) + 'M'; // Millions
  } else if (number >= 1000) {
      return (number / 1000).toFixed(2) + 'K'; // Thousands
  } else {
      return number.toString();
  }
}