import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { withLDProvider } from 'launchdarkly-react-client-sdk';
import Observability from '@launchdarkly/observability';
import SessionReplay from '@launchdarkly/session-replay';
import './index.css'
import App from './App.tsx'
import type { LDContext } from 'launchdarkly-js-client-sdk';

export const anon_context: LDContext = {
  kind: 'anonContext',
  key: 'context-key-123abc',
  anonymous: true
};

const LDProvider = withLDProvider({
  clientSideID: import.meta.env.VITE_LD_CLIENT_ID,
  context: anon_context,
  options: {
    plugins: [
      new Observability({
        networkRecording: {
          enabled: true,
          recordHeadersAndBody: true
        }
      }),
      new SessionReplay({
        privacySetting: 'none'
      })
    ],
  }
})(App);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LDProvider />
  </StrictMode>,
)
