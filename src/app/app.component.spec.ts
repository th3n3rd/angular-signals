import { AppComponent } from './app.component';
import { render, screen } from '@testing-library/angular';
import { SetupWorker, setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';

describe('AppComponent', () => {

  const backendServer = setupBackendServer();

  beforeEach(() => {
    givenServerStatus(backendServer, "DOWN");
  });

  describe("initially", () => {
    it('greets a friend', async () => {
      await render(AppComponent);
      expect(screen.getByText('Hello Friend!')).toBeDefined();
    });

    it("shows the backend as Offline", async () => {
      await render(AppComponent);
      expect(screen.getByText('Backend is Offline')).toBeDefined();
    });
  });

  describe("eventually", () => {

    it('greets everybody', async () => {
      await render(AppComponent);
      expect(await screen.findByText('Hello Everybody Else!', {}, { timeout: 2000 })).toBeDefined();
    });

    it('shows the backend as Online', async () => {
      givenServerStatus(backendServer, "UP");
      await render(AppComponent);
      expect(await screen.findByText('Backend is Online')).toBeDefined();
    });
  });

  function givenServerStatus(server: SetupWorker, status: string) {
    server.use(
        http.get("/api/status", () => {
          return HttpResponse.json({
            status: status
          })
        })
    )
  }

  function setupBackendServer() {
    const server = setupWorker();
    beforeAll(() => server.start({
      quiet: true
    }));
    afterEach(() => server.resetHandlers());
    afterAll(() => server.stop());
    return server;
  }
});
