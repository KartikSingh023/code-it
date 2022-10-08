const CONSTANTS = {
  PREFIX: 'na-rce-',
  SERVER_URL: 'http://localhost:9000',
  DOCS: 'https://github.com/nafees87n/codebox/blob/main/docs/DOCS.md',
  GITHUB_URL: 'https://github.com/nafees87n/codebox',
  MODES: {
    javascript: 'js',
    c_cpp: 'cpp',
    python: 'py',
  },
  DEFAULT_CODE: {
    javascript: "console.log('hello rce')",
    c_cpp:
      '#include <iostream>\n\nint main() {\n\tstd::cout << "hello rce";\n\treturn 0;\n}',
    python: "print('hello rce')",
  },
  THEMES: {
    Ambiance: 'ambiance',
    Chaos: 'chaos',
    Chrome: 'chrome',
    Clouds: 'clouds',
    'Clouds Midnight': 'clouds_midnight',
    Cobalt: 'cobalt',
    'Crimson Editor': 'crimson_editor',
    Dawn: 'dawn',
    Dracula: 'dracula',
    Eclipse: 'eclipse',
    GitHub: 'github',
    Gob: 'gob',
    'Mono Industrial': 'mono_industrial',
    Monokai: 'monokai',
    Terminal: 'terminal',
    Textmate: 'textmate',
    Tomorrow: 'tomorrow',
    'Tomorrow Night': 'tomorrow_night',
    'Tomorrow Night Blue': 'tomorrow_night_blue',
    Twilight: 'twilight',
    XCode: 'xcode',
  },
  DEFAULT_THEME: 'cobalt',
}

module.exports = CONSTANTS
