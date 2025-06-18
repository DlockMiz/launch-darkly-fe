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
  const flags = useFlags();
  const [user, setUser] = useState<User | null>(null);
  const [power, setPower] = useState<number>(60);
  const [voiceMessage, setVoiceMessage] = useState<string>('');
  let ldClient = useLDClient();

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

  useEffect(() => {
    if (!user) return;
    const multiContext = getMultiContext(user);
    sendContextToAPI(multiContext);
  }, [flags.theVoiceFeature]);

  const sendContextToAPI = async (context: any) => {
    try {
      const res = await fetch('http://127.0.0.1:5000/context', {
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

  const handleKill = () => {
    console.log("Killing user:", user);
    if (!user) return;
    const multiContext = getMultiContext(user);
    ldClient && ldClient.track('kill-event', multiContext);
    if (user.role === 'superhero') setPower((p) => Math.max(0, p - 20));
    else setPower((p) => Math.min(100, p + 20));
  };

  const handleSave = () => {
    console.log("Saving user power:", power);
    if (!user) return;
    const multiContext = getMultiContext(user);
    ldClient && ldClient.track('save-event', multiContext);
    if (user.role === 'villain') setPower((p) => Math.max(0, p - 20));
    else setPower((p) => Math.min(100, p + 20));
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '40vh', width: '100%' }}>
        <div style={{ width: 400, maxWidth: '90vw', margin: '32px auto 0 auto' }}>
          <ChooseCharacterButton onCharacterAssign={setUser} />
        </div>
        {user && (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', marginTop: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 32 }}>
            </div>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0002', padding: 32, minWidth: 300, textAlign: 'center', margin: '0 32px' }}>
              <img src={user.avatarUrl} alt={user.name} style={{ width: 160, height: 160, borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }} />
              <div style={{ fontWeight: 'bold', fontSize: 28 }}>{user.name}</div>
              <div style={{ fontSize: 16, color: '#888' }}>{user.email}</div>
            </div>
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
      <div className="feature-flags-bottom-left">
        {flags.lightsaberFeature && (
          <div style={{ width: 260, margin: '10 auto', marginTop: 22, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <LightsaberIcon />
          </div>
        )}
        <FeatureFlagsCard flags={flags} />
      </div>
      {flags.theVoiceFeature && (
        <div className="the-voice-top-right">
          <TheVoiceCard message={JSON.stringify(voiceMessage)} />
        </div>
      )}
    </>
  )
}

export default App
