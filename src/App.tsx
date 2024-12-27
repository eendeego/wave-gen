import {createEffect, createSignal, type Component} from 'solid-js';
import {createStore} from 'solid-js/store';
import {frequencyKey, keyFrequency, scientificPitchName} from './pianoKeyboard';
import ThemeToggle from './ThemeToggle';
import Keyboard from './Keyboard';

type AudioEnvironment = {
  audioCtx: AudioContext;
  oscillator: OscillatorNode;
  gainNode: GainNode;
};

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

const initAudioEnv = () => {
  const AudioContext = window.AudioContext ?? window.webkitAudioContext;
  const audioCtx = new AudioContext();

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  gainNode.gain.value = 0.5;

  oscillator.start(0);

  oscillator.disconnect(gainNode);

  return {
    audioCtx,
    oscillator,
    gainNode,
  };
};

const App: Component = () => {
  // `n` as in https://en.wikipedia.org/wiki/Piano_key_frequencies#
  const [keyNumber, setKeyNumber] = createSignal<number | null>(49);
  const [frequency, setFrequency] = createSignal<number | null>(
    keyFrequency(keyNumber()),
  );
  const [playing, setPlaying] = createSignal<boolean>(false);

  const [audioEnv, setAudioEnv] = createStore<{e: AudioEnvironment | null}>({
    e: null,
  });

  const handlePlaying = (playing: boolean) => {
    setPlaying(playing);

    let env = audioEnv.e;
    if (env == null) {
      env = initAudioEnv();
      setAudioEnv({e: env});
    }

    if (playing) {
      env.oscillator.frequency.value = frequency();
      env.oscillator.connect(env.gainNode);
    } else {
      env.oscillator.disconnect(env.gainNode);
    }
  };

  createEffect(() => {
    const env = audioEnv.e;
    if (!playing() || env == null) {
      return;
    }

    if (frequency() == null) {
      env.oscillator.disconnect(env.gainNode);
    } else {
      env.oscillator.frequency.value = frequency();
    }
  });

  const handleFrequencyInput = (
    event: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
  ) => {
    const inputValue = event.currentTarget.value;
    const value = inputValue == null ? null : parseFloat(inputValue);
    setFrequency(value);
    setKeyNumber(frequencyKey(value));
  };

  const scientificPitchLabel = (frequency: number) => {
    const pitch = scientificPitchName(frequencyKey(frequency));
    return (
      <>
        {pitch[0]}
        {pitch[1] !== '' ? '♯' : ''}
        <sub>{pitch[2]}</sub>
      </>
    );
  };

  const handleKeyNumberChange = (key: number) => {
    setKeyNumber(key);
    setFrequency(keyFrequency(key));
  };

  return (
    <>
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <a class="btn btn-ghost text-xl">Wave generator</a>
        </div>
        <div class="flex-none">
          <ThemeToggle />
        </div>
      </div>
      <div class="mx-auto card card-compact bg-base-300 w-11/12 shadow-xl">
        <div class="card-body">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Pitch</span>
              <span class="label-text-alt">Hz</span>
            </div>
            <input
              type="number"
              name="pitch"
              id="pitch"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
              value={frequency()}
              onInput={(e) => handleFrequencyInput(e)}
            />
            <div class="label">
              <span class="label-text">{frequencyKey(frequency())}</span>
              <span class="label-text-alt">
                {scientificPitchLabel(frequency())}
              </span>
            </div>
          </label>
          <h3 class="text-base font-medium tracking-tight">
            Keyboard Frequencies
          </h3>
          <p class="text-slate-500 text-sm">
            Reference:{' '}
            <a
              class="text-blue-700"
              href="https://en.wikipedia.org/wiki/Piano_key_frequencies#"
            >
              Wikipedia - Piano key frequencies
            </a>
          </p>
          <Keyboard
            keyNumber={keyNumber()}
            onKeyNumberChange={handleKeyNumberChange}
          />
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">Play</span>
              <input
                type="checkbox"
                class="toggle"
                checked={playing()}
                onInput={(e) => handlePlaying(e.currentTarget.checked)}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
