type Recipe<T> = (draft: T) => void;

export function produce<T extends object>(baseState: T, recipe: Recipe<T>) {
  let copyState: T | undefined;

  const draft = new Proxy(baseState, {
    set(target, key, value) {
      if (!copyState) {
        if (Array.isArray(target))
          copyState = [...target] as T;

        else
          copyState = { ...target } as T;
      }

      (copyState as any)[key] = value;
      return true;
    },
  });

  recipe(draft);

  return (copyState ?? baseState);
};
