export type KeyboardConfig = {
  keys: number;
  width: number;
  firstKeyNumber: number;
};

export const KEYBOARD_CONFIGS = {
  'piano-88': {
    keys: 3 + 7 * 12 + 1,
    width: 2 + 7 * 7 + 1,
    firstKeyNumber: 1,
  },
  'piano-108': {
    keys: 9 * 12,
    width: 9 * 7,
    firstKeyNumber: -8,
  },
};
