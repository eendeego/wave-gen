import type {Component} from 'solid-js';

import ThemeToggle from './ThemeToggle';

const App: Component = () => {
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
      <div class="hero bg-base-200 h-96">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold">Hello there</h1>
            <p class="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button class="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
