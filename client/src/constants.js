module.exports = {
  PREFIX: 'na-rce-',
  SOCKET: "http://localhost:9000",
  DOCS: "https://github.com/nafees87n/codebox/blob/main/docs/DOCS.md",
  GITHUB_URL: "https://github.com/nafees87n/codebox",
  MODES: {
    javascript: "js",
    c_cpp: "cpp",
    python: "py"
  },
  DEFAULT_CODE: {
    javascript: "console.log('hello rce')",
    c_cpp: '#include <iostream>\n\nint main() {\n\tstd::cout << "hello rce";\n\treturn 0;\n}',
    python: "print('hello rce')",
  }
}