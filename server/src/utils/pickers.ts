import { head } from "ramda";

export function pickFirstFromArray<T>(arr: T[]) {
  return head(arr);
}
