type ArrayItemType<T> = T extends Array<infer ElementType> ? ElementType : never;
type Res = ArrayItemType<[string, number]>;