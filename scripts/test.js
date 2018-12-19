const fn = require('funclib');
const glob = require('glob');

const specs = glob.sync('test/core-methods/*.spec.js');

fn.match(process.argv[2], {
  '-s': () => {
    specs.forEach(spec => {
      const content = fn.rd(spec).replace(/\/\*\*\@server\+\*\/\/\*/mg, '/**@server-*/');
      fn.wt(spec, content)
    });
  },
  '-c': () => {
    specs.forEach(spec => {
      const content = fn.rd(spec).replace(/\/\*\*\@server\-\*\//mg, '/**@server+*//*');
      fn.wt(spec, content)
    });
  },
});

