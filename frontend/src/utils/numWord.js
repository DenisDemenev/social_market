export const num_word = (number) => {
  let words = ['подписчик', 'подписчика', 'подписчиков'];
  let value = Math.abs(number) % 100;
  let num = value % 10;

  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num === 1) return words[0];

  if (value >= 5 && value <= 20) {
    return words[2];
  } else if (num === 0 || (num >= 5 && num <= 9)) {
    return words[2];
  } else {
    return words[1];
  }
};
