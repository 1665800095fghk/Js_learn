type IsAny<T> = 0 extends 1 & T ? true : false;

type Res = IsAny<unknown>;