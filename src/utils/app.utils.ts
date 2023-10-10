export function isNullableValue<T>(value: T) {
  switch (value) {
    case null:
    case undefined:
    case '':
      return true;
    default:
      return false;
  }
}
