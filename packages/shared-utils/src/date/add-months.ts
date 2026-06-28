export function addMonths(date: Date, months: number): Date {
  if (!Number.isInteger(months) || months <= 0) {
    throw new Error("months must be a positive integer");
  }

  const copy = new Date(date);
  copy.setMonth(copy.getMonth() + months);
  return copy;
}
