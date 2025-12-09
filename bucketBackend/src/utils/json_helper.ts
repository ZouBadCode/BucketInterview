export function toJSONSafe<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  const t = typeof data;

  if (t === "bigint") {
    return data.toString() as unknown as T; // Json.Stringify can't process BigInt, so convert it to string
  }

  if (t !== "object") {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => toJSONSafe(item)) as unknown as T;
  }

  // to handle nested objects recursively
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (typeof value === "bigint") {  
      result[key] = value.toString();
    } else if (value && typeof value === "object") {
      result[key] = toJSONSafe(value);
    } else {
      result[key] = value;
    }
  }

  return result as T;
}
