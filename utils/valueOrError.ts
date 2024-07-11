export type ValueOrError<V, E> = Value<V> | Error<E>;

export type Value<V> = {
  type: "value";
  value: V;
};

export type Error<E> = {
  type: "error";
  error: E;
};

export const createValue = <V>(val: V): Value<V> => ({
  type: "value",
  value: val,
});

export const createError = <E>(error: E): Error<E> => ({
  type: "error",
  error: error,
});

export function isValue<V, E>(obj: ValueOrError<V, E>): obj is Value<V>;
export function isValue<V, E>(obj: unknown): obj is Value<V> {
  return (obj as ValueOrError<V, E>).type === "value";
}

export function isError<V, E>(obj: ValueOrError<V, E>): obj is Error<E>;
export function isError<V, E>(obj: unknown): obj is Error<E> {
  return (obj as ValueOrError<V, E>).type === "error";
}

/**
 * Gives you the value if available, or error. Useful when you just want to display whatever is contained inside the object
 * @param valueOrError
 * @returns value or error
 */
export function unwrap<E>(obj: Error<E>): E;
export function unwrap<V>(obj: Value<V>): V;
export function unwrap<V, E>(obj: ValueOrError<V, E>): V | E;
export function unwrap<V, E>(obj: unknown): V | E {
  if (isValue(obj as Value<V>)) {
    return (obj as Value<V>).value;
  }
  if (isError(obj as Error<E>)) {
    return (obj as Error<E>).error;
  }
  throw new Error("Invalid argument");
}
