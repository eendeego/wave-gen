import {For} from 'solid-js';
import {isAccidental} from './pianoKeyboard';
import {KEYBOARD_CONFIGS, KeyboardConfig} from './keyboardLayouts';

const KEY_MARGIN = 0;
const KEY_WIDTH = 16;
const KEY_LENGTH = 7 * KEY_WIDTH;
const ACCIDENTAL_KEY_WIDTH = (5 * KEY_WIDTH) / 8;
const ACCIDENTAL_KEY_LENGTH = 4 * KEY_WIDTH;

const KEY_C =
  `m${KEY_MARGIN} ${KEY_LENGTH - KEY_MARGIN}` +
  `h${KEY_WIDTH - KEY_MARGIN * 2}` +
  `v-${KEY_LENGTH - ACCIDENTAL_KEY_LENGTH - KEY_MARGIN * 2}` +
  `h-${ACCIDENTAL_KEY_WIDTH / 2}` +
  `v-${ACCIDENTAL_KEY_LENGTH}` +
  `h-${KEY_WIDTH - ACCIDENTAL_KEY_WIDTH / 2 - KEY_MARGIN * 2}` +
  `z`;
const KEY_C_SHARP =
  `m${KEY_MARGIN} ${ACCIDENTAL_KEY_LENGTH - KEY_MARGIN}` +
  `h${ACCIDENTAL_KEY_WIDTH - KEY_MARGIN * 2}` +
  `v-${ACCIDENTAL_KEY_LENGTH - KEY_MARGIN * 2}` +
  `h-${ACCIDENTAL_KEY_WIDTH - KEY_MARGIN * 2}` +
  `z`;
const KEY_D =
  `m${KEY_MARGIN} ${KEY_LENGTH - KEY_MARGIN}` +
  `v-${KEY_LENGTH - ACCIDENTAL_KEY_LENGTH - KEY_MARGIN * 2}` +
  `h${ACCIDENTAL_KEY_WIDTH / 2}` +
  `v-${ACCIDENTAL_KEY_LENGTH}` +
  `h${KEY_WIDTH - ACCIDENTAL_KEY_WIDTH - KEY_MARGIN * 2}` +
  `v${ACCIDENTAL_KEY_LENGTH}` +
  `h${ACCIDENTAL_KEY_WIDTH / 2}` +
  `v${KEY_LENGTH - ACCIDENTAL_KEY_LENGTH - KEY_MARGIN * 2}` +
  `z`;
const KEY_E =
  `m${KEY_MARGIN} ${KEY_LENGTH - KEY_MARGIN}` +
  `h${KEY_WIDTH - KEY_MARGIN * 2}` +
  `v-${KEY_LENGTH - KEY_MARGIN * 2}` +
  `h-${KEY_WIDTH - ACCIDENTAL_KEY_WIDTH / 2 - KEY_MARGIN * 2}` +
  `v${ACCIDENTAL_KEY_LENGTH}` +
  `h-${ACCIDENTAL_KEY_WIDTH / 2}` +
  `z`;
const KEY_FULL =
  `m${KEY_MARGIN} ${KEY_LENGTH - KEY_MARGIN}` +
  `h${KEY_WIDTH - KEY_MARGIN * 2}` +
  `v-${KEY_LENGTH - KEY_MARGIN * 2}` +
  `h-${KEY_WIDTH - KEY_MARGIN * 2}` +
  `z`;

const KEY_PATHS = [
  KEY_C,
  KEY_C_SHARP,
  KEY_D,
  KEY_C_SHARP,
  KEY_E,
  KEY_C,
  KEY_C_SHARP,
  KEY_D,
  KEY_C_SHARP,
  KEY_D,
  KEY_C_SHARP,
  KEY_E,
];

const keyPath = (kbd: KeyboardConfig, keyNumber: number) => {
  const path = KEY_PATHS[(keyNumber + 8) % 12];
  if (keyNumber === kbd.firstKeyNumber) {
    return path === KEY_D ? KEY_C : path === KEY_E ? KEY_FULL : path;
  }
  if (keyNumber === kbd.firstKeyNumber + kbd.keys - 1) {
    return path === KEY_D ? KEY_E : path === KEY_C ? KEY_FULL : path;
  }
  return path;
};

const KEY_OFFSETS = [
  0 * KEY_WIDTH,
  1 * KEY_WIDTH - ACCIDENTAL_KEY_WIDTH / 2,
  1 * KEY_WIDTH,
  2 * KEY_WIDTH - ACCIDENTAL_KEY_WIDTH / 2,
  2 * KEY_WIDTH,
  3 * KEY_WIDTH,
  4 * KEY_WIDTH - ACCIDENTAL_KEY_WIDTH / 2,
  4 * KEY_WIDTH,
  5 * KEY_WIDTH - ACCIDENTAL_KEY_WIDTH / 2,
  5 * KEY_WIDTH,
  6 * KEY_WIDTH - ACCIDENTAL_KEY_WIDTH / 2,
  6 * KEY_WIDTH,
];

const keyOffset = (kbd: KeyboardConfig, keyNumber: number) =>
  Math.floor((keyNumber + 8) / 12) * 7 * KEY_WIDTH +
  KEY_OFFSETS[(keyNumber + 8) % 12] -
  (Math.floor((kbd.firstKeyNumber + 8) / 12) * 7 * KEY_WIDTH +
    KEY_OFFSETS[(kbd.firstKeyNumber + 8) % 12]);

const keyFill = (
  kbd: KeyboardConfig,
  keyNumber: number,
  selectedKeyNumber: number,
) => {
  if (keyNumber === selectedKeyNumber) {
    return 'oklch(var(--s))';
  }

  return keyNumber === 49
    ? 'oklch(var(--b2))'
    : keyNumber === 40
      ? 'oklch(var(--b2)'
      : isAccidental(keyNumber)
        ? '#000000'
        : '#ffffff';
};

const keyStroke = (
  kbd: KeyboardConfig,
  keyNumber: number,
  selectedKeyNumber: number,
) => {
  if (keyNumber === selectedKeyNumber) {
    return 'oklch(var(--s))';
  }

  return isAccidental(keyNumber) ? 'none' : 'black';
};

const Keyboard = (props: {
  keyNumber: number;
  onKeyNumberChange: (keyNumber: number) => void;
}) => {
  const size = 'piano-88';
  const keyboard = KEYBOARD_CONFIGS[size];
  const width = keyboard.width * KEY_WIDTH;
  const height = KEY_LENGTH;
  const first = keyboard.firstKeyNumber;
  const keys = Array.from(new Array(keyboard.keys), (v, i) => first + i);

  return (
    <div class="w-100" style={{'max-width': width + 'px'}}>
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
      >
        <For each={keys}>
          {(keyNumber) => (
            <path
              transform={`translate(${keyOffset(keyboard, keyNumber)},0)`}
              d={keyPath(keyboard, keyNumber)}
              style={{
                fill: keyFill(keyboard, keyNumber, props.keyNumber),
                stroke: keyStroke(keyboard, keyNumber, props.keyNumber),
              }}
              onClick={() => props.onKeyNumberChange(keyNumber)}
            />
          )}
        </For>
      </svg>
    </div>
  );
};

export default Keyboard;
