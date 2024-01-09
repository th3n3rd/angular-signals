import { configure } from '@testing-library/angular';

configure({
  dom: {
    getElementError: (message, container) => {
      const error = new Error(message || "");
      error.name = 'TestingLibraryElementError';
      error.stack = "";
      return error;
    },
  }
});
