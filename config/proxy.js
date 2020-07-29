/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api_v1': {
        // target: 'http://api-mmall.yzhold.com/', // Dev环境(生产环境)
        // target: 'http://192.168.1.238:10751/', // uat环境(测试环境)
        // target: 'http://192.168.1.215:10751/', // Rls环境)(...)
        target: 'http://localhost:8081/', // 正式环境
        ws: true,
        changeOrigin: true,
        // autoRewrite: false,
        // cookieDomainRewrite: false,
        pathRewrite: {
          '^/api_v1': '/'
        }
      },
  },
  // dev: {
  //   '/api/': {
  //     target: 'https://preview.pro.ant.design',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^': '',
  //     },
  //   },
  // },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
