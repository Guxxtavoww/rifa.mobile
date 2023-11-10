interface iOptions<T extends Record<string, any>> {
  label: keyof T;
  value: keyof T;
}

export function transformToSelectOptions<T extends Record<string, any>>(
  array: T[],
  options: iOptions<T>
): SelectOptions {
  return array.map((item) => ({
    label: String(item[options.label]),
    value: String(item[options.value]),
  }));
}
