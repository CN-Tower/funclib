const fn = require('funclib');
const glob = require('glob');

const specs = glob.sync('test/core-methods/*.spec.js');

// test/core-method中的客户端和服务端测试开关，-s为服务端测试-cy为客户端测试
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
  '-d': () => {
    
  }
});

