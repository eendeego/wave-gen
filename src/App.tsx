import {createSignal, type Component} from 'solid-js';

import ThemeToggle from './ThemeToggle';

const App: Component = () => {
  const [frequency, setFrequency] = createSignal<number | null>(440);

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
      <div class="container mx-auto card card-compact bg-base-100 w-3/4 shadow-xl">
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
              onInput={(e) => {
                const v = e.currentTarget.value;
                setFrequency(v == null ? null : parseFloat(v));
              }}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default App;
