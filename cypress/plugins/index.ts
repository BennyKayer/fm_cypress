/// <reference types="cypress" />
//
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

import reset from '../../prisma/reset.cjs';
import seed from '../../prisma/seed.cjs';

// Task get registered
const plugins: Cypress.PluginConfig = (on) => {
  on('task', {
    reset() {
      return reset();
    },
    seed() {
      return seed();
    },
  });
};

export default plugins;
