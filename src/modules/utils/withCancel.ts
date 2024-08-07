export function withCancel<T>(
  asyncIterator: globalThis.AsyncIterator<T | undefined>,
  onCancel: () => void,
): globalThis.AsyncIterator<T | undefined> {
  if (!asyncIterator.return) {
    asyncIterator.return = () =>
      Promise.resolve({ value: undefined, done: true });
  }

  const savedReturn = asyncIterator.return.bind(asyncIterator);
  asyncIterator.return = () => {
    onCancel();
    return savedReturn();
  };

  return asyncIterator;
}
