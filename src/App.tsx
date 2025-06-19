// App.tsx - Main React app for LaunchDarkly demo
// Handles character selection, feature flag-driven UI, power logic, and API context posting

import { useFlags } from 'launchdarkly-react-client-sdk';
import './App.css'
import ChooseCharacterButton from './components/ChooseCharacterButton';
import { useEffect, useState } from 'react';
import { type User } from './types/User';
import * as ld from 'launchdarkly-js-client-sdk';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import FeatureFlagsCard from './components/FeatureFlagsCard';
import UserPowerBar from './components/UserPowerBar';
import KillSaveButtons from './components/KillSaveButtons';
import { anon_context } from './main';
import LightsaberIcon from './components/LightsaberIcon';
import TheVoiceCard from './components/TheVoiceCard';

function App() {
  // LaunchDarkly feature flags
  const flags = useFlags();
  // Current user (comic character)
  const [user, setUser] = useState<User | null>(null);
  // Power level for the user
  const [power, setPower] = useState<number>(60);
  // Message from /context API (for TheVoiceCard)
  const [voiceMessage, setVoiceMessage] = useState<string>('');
  // LaunchDarkly client instance
  let ldClient = useLDClient();

  // On user change, reset power and identify with LaunchDarkly
  useEffect(() => {
    if (!user) return;
    setPower(60); // Reset power when user changes

    const options: ld.LDOptions = { hash: 'server-generated-hash-123abc' };
    const multiContext = getMultiContext(user);

    console.log("Identifying user with multi-context:", multiContext);

    ldClient && ldClient.identify(multiContext, options.hash, () => {
      console.log("New context's flags available");
      if (flags.theVoiceFeature) {
        sendContextToAPI(multiContext);
      }
    });
  }, [user]);

  // If theVoiceFeature flag changes, re-send context to API
  useEffect(() => {
    if (!user) return;
    const multiContext = getMultiContext(user);
    sendContextToAPI(multiContext);
  }, [flags.theVoiceFeature]);

  // POST the current context to the /context API and update TheVoiceCard
  const sendContextToAPI = async (context: any) => {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(context)
      });
      const data = await res.text();
      setVoiceMessage(data); // Save the response for TheVoiceCard
      console.log('Context sent to API:', data);
    } catch (err) {
      setVoiceMessage('Error sending context to API');
      console.error('Error sending context to API:', err);
    }
  };

  // Build a LaunchDarkly multi-context object (user + anon)
  const getMultiContext = (user: User) => {
    const userContext: ld.LDContext = {
      kind: 'user',
      key: user.email,
      name: user.name,
      role: user.role,
      type: user.type,
      universe: user.universe,
    };
    return {
      kind: 'multi',
      user: userContext,
      anonContext: anon_context
    };
  };

  // Handle Kill button: track event and adjust power
  const handleKill = () => {
    console.log("Killing user:", user);
    if (!user) return;
    const multiContext = getMultiContext(user);
    ldClient && ldClient.track('kill-event', multiContext);
    if (user.role === 'superhero') setPower((p) => Math.max(0, p - 20));
    else setPower((p) => Math.min(100, p + 20));
  };

  // Handle Save button: track event and adjust power
  const handleSave = () => {
    console.log("Saving user power:", power);
    if (!user) return;
    const multiContext = getMultiContext(user);
    ldClient && ldClient.track('save-event', multiContext);
    if (user.role === 'villain') setPower((p) => Math.max(0, p - 20));
    else setPower((p) => Math.min(100, p + 20));
  };

  // Main UI rendering
  return (
    <>
      {/* Lightsaber icon above feature flags (if enabled) */}
      <div className="feature-flags-bottom-left">
        {flags.lightsaberFeature && (
          <div style={{ width: 260, margin: '10 auto', marginTop: 22, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <LightsaberIcon />
          </div>
        )}
        <FeatureFlagsCard flags={flags} />
      </div>
      {/* Main character selection and user panel */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '40vh', width: '100%' }}>
        <div style={{ width: 400, maxWidth: '90vw', margin: '32px auto 0 auto' }}>
          <ChooseCharacterButton onCharacterAssign={setUser} />
        </div>
        {user && (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', marginTop: 24 }}>
            {/* Left column (empty for spacing) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 32 }}>
            </div>
            {/* User info card */}
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0002', padding: 32, minWidth: 300, textAlign: 'center', margin: '0 32px' }}>
              <img src={user.avatarUrl} alt={user.name} style={{ width: 160, height: 160, borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }} />
              <div style={{ fontWeight: 'bold', fontSize: 28 }}>{user.name}</div>
              <div style={{ fontSize: 16, color: '#888' }}>{user.email}</div>
            </div>
            {/* Right column: Kill/Save buttons and Power bar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 32 }}>
              {flags.killOrSaveFeature && (
                <KillSaveButtons onKill={handleKill} onSave={handleSave} />
              )}
              {flags.powerLevelFeature && (
                <div style={{ marginTop: 24 }}>
                  <UserPowerBar power={power} userName={user.name} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* The Voice card (bottom right, if enabled) */}
      {flags.theVoiceFeature && (
        <div className="the-voice-top-right">
          <TheVoiceCard message={JSON.stringify(voiceMessage)} />
        </div>
      )}
    </>
  )
}

export default App
