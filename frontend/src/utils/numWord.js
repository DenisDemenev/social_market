export const num_word = (number) => {
  let words = ['подписчик', 'подписчика', 'подписчиков'];
  let value = Math.abs(number) % 100;
  let num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num === 1) return words[0];
  return words[2];
};
