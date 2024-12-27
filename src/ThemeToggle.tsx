import {createSignal, createEffect} from 'solid-js';
import Fa from 'solid-fa';
import {faMoon, faSun} from '@fortawesome/free-regular-svg-icons';

/*
 * Theme toggler, as seen on https://github.com/solidjs/solid/discussions/1158
 */

const initializeTheme = (): 'light' | 'dark' => {
  let theme: 'light' | 'dark' | null;
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme') as 'light' | 'dark';
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = 'dark';
  } else {
    theme = 'light';
  }
  return theme;
};

const ThemeToggle = () => {
  const [theme, setTheme] = createSignal<string>(initializeTheme());

  createEffect(() => {
    const root = document.documentElement;
    if (theme() === 'light') {
      root.dataset.theme = 'light';
      localStorage.setItem('theme', 'light');
    } else {
      root.dataset.theme = 'night';
      localStorage.setItem('theme', 'dark');
    }
  });

  return (
    <div>
      <button
        class="btn btn-square btn-ghost"
        onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      >
        <Fa icon={theme() == 'light' ? faSun : faMoon} />
      </button>
    </div>
  );
};

export default ThemeToggle;
