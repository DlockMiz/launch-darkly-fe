import React from 'react';

interface TheVoiceCardProps {
  message: string;
}

// Helper to unescape escaped newlines (\n) and tabs (\t) for display
function unescapeMessage(msg: string) {
  try {
    // Try to parse as JSON string if possible (handles escaped chars)
    return JSON.parse(`"${msg.replace(/"/g, '\"')}"`);
  } catch {
    // Fallback: replace common escapes
    return msg.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
  }
}

const TheVoiceCard: React.FC<TheVoiceCardProps> = ({ message }) => (
  <div className="the-voice-bottom-right" style={{ border: '2px solid #bfa700', borderRadius: 8, padding: 16, background: 'rgba(255,255,255,0.85)', minWidth: 260, position: 'fixed', right: 0, bottom: 0, margin: 24, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2 style={{ textAlign: 'center', margin: 0, marginBottom: 12, color: '#bfa700', width: '100%' }}>The Voice</h2>
    <textarea
      value={unescapeMessage(message)}
      readOnly
      style={{ display: 'block', width: '100%', minHeight: 280, height: 280, border: '1px solid #bfa700', borderRadius: 4, padding: 8, fontSize: 14, background: 'transparent', color: '#333', resize: 'none', boxSizing: 'border-box', textAlign: 'left' }}
    />
  </div>
);

export default TheVoiceCard;
