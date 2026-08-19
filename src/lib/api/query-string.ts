export function buildQueryString(
  params: Record<string, unknown>,
): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      continue;
    }

    if (
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      for (const [
        operator,
        operatorValue,
      ] of Object.entries(
        value as Record<string, unknown>,
      )) {
        if (
          operatorValue === undefined ||
          operatorValue === null ||
          operatorValue === ""
        ) {
          continue;
        }

        searchParams.set(
          `${key}[${operator}]`,
          String(operatorValue),
        );
      }
    } else {
      searchParams.set(
        key,
        String(value),
      );
    }
  }

  const queryString = searchParams.toString();

  return queryString
    ? `?${queryString}`
    : "";
}