const CONSTANTS = {
  PORT: 9000,
  USERSTORAGEPATH: '/storage/',
  CLIENT_URL:'http://localhost:3000',

  /*CONSTANTS FOR CODE FILE*/
  CPP: {
    REGEX: /#include\s*<([\w^h]*).?h?>/gim,
    ACCEPT_LIST: [
      'iostream',
      'algorithm',
      'stdio',
      'cstdio',
      'vector',
      'math',
      'cmath',
      'cstring',
      'string',
      'deque',
      'iomanip',
      'iterator',
      'map',
      'queue',
      'set',
      'stack',
      'conio',
      'ctype',
    ]
  },
  JS: {
    REGEX: /require\s*\(\s*['"]\s*(.+)\s*['"]\s*\)/gim,
    ACCEPT_LIST: [
      'readline',
      'buffer',
      'string_decoder',
      'timers',
      'stream',
      'util',
    ],
  },
  PYTHON: {
    BASIC_REGEX: /import\s+(.+)/gim,
    SPECIFIC_REGEX: /import.+from\s+(.+)/gim,
    REJECT_LIST: ['os', 'subprocess', 'shlex', 'xml', 'pickle'],
  },

  /*CONSTANTS FOR SOCKET*/
  SOCKET: {
    ORIGIN: 'http://localhost:3000',
    METHODS: ['GET', 'POST']
  }

}

module.exports = CONSTANTS;