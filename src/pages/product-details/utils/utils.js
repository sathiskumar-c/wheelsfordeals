export const calculateEMI = (principal, rate, months) => {
  const monthlyRate = rate / 12 / 100;
  return Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
  );
};
