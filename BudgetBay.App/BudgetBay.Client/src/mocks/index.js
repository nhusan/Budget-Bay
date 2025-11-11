import { worker } from './browser';

let isWorkerStarted = false;

/**
 * Starts the mock service worker if it hasn't been started already.
 */
export const startMockWorker = async () => {
  if (!isWorkerStarted) {
    console.log('Starting Mock Service Worker for demo mode...');
    isWorkerStarted = true;
    return worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
};