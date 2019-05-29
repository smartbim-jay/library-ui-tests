require('dotenv-safe').config();
exports.config = {
  tests: './src/tests/**/*.js',
  output: './output',
  helpers: {
    Puppeteer: {
      show: false,
      restart: false,
      keepBrowserState: false,
      keepCookies: false,
      windowSize: '1200x800',
      waitForAction: 300,
      chrome: {
        // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
        // https://peter.sh/experiments/chromium-command-line-switches/
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    },
  },
  include: {
    productsPage: './src/pages/products.js',
  },
  bootstrap: null,
  mocha: {},
  name: 'manager-ui-tests',
  plugins: {
    autoDelay: {
      enabled: true,
    },
    autoLogin: {
      enabled: false,
      saveToFile: true,
      inject: 'loginAs',
      users: {
        user: {
          login: I => {
            I.amOnPage(process.env.URL);
            I.waitForElement('#user_email', 5);
            I.fillField('#user_email', process.env.USERNAME);
            I.fillField('#user_password', process.env.PASSWORD);
            I.click('Login');
            I.retry(5).see('Dashboard');
          },
          check: I => {
            I.amOnPage(process.env.URL);
            I.waitForElement('.header-search', 5);
          },
          fetch: I => {
            return I.executeScript(() => {
              return {
                token: localStorage.getItem('token'),
                profile: JSON.parse(localStorage.getItem('profile'))
              };
            });
          },
          restore: (I, session) => {
            I.amOnPage(process.env.URL);
            I.executeScript(session => {
              localStorage.setItem('token', session.token);
              localStorage.setItem('profile', JSON.stringify(session.profile));
            }, session);
          },
        },
      },
    },
  },
  multiple: {
    parallel: {
      chunks: 4
    },
  },
};
