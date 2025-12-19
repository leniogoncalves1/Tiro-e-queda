
export const generateSecretNumber = (): string => {
  const digits = Array.from({ length: 10 }, (_, i) => i.toString());
  const shuffled = digits.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4).join('');
};

export const calculateResult = (guess: string, secret: string) => {
  let tiros = 0;
  let quedas = 0;

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === secret[i]) {
      tiros++;
    } else if (secret.includes(guess[i])) {
      quedas++;
    }
  }

  let resultLabel = '';
  if (tiros === 0 && quedas === 0) {
    resultLabel = 'Água';
  } else {
    const tirosPart = tiros > 0 ? `${tiros} ${tiros === 1 ? 'Tiro' : 'Tiros'}` : '';
    const quedasPart = quedas > 0 ? `${quedas} ${quedas === 1 ? 'Queda' : 'Quedas'}` : '';
    resultLabel = [tirosPart, quedasPart].filter(Boolean).join(' e ');
  }

  return { tiros, quedas, resultLabel };
};

export const validateGuess = (guess: string, previousGuesses: string[]): string | null => {
  if (guess.length !== 4) return "O palpite deve ter exatamente 4 dígitos.";
  if (!/^\d+$/.test(guess)) return "Use apenas números.";
  
  const uniqueDigits = new Set(guess);
  if (uniqueDigits.size !== 4) return "Os dígitos não podem se repetir no palpite.";
  
  if (previousGuesses.includes(guess)) return "Você já tentou este número anteriormente.";
  
  return null;
};
