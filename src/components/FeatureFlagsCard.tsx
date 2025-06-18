import React from 'react';

interface FeatureFlagsCardProps {
  flags: Record<string, unknown>;
}

const FeatureFlagsCard: React.FC<FeatureFlagsCardProps> = ({ flags }) => (
  <div style={{ border: '2px solid #ccc', borderRadius: 8, padding: 16, background: 'transparent', minWidth: 220 }}>
    <div>
      <h4 style={{ textAlign: 'left', margin: 0, marginBottom: 12 }}>Feature Flags</h4>
      <ul style={{ textAlign: 'left', paddingLeft: 20, margin: 0 }}>
        {Object.entries(flags).map(([key, value]) => (
          <li key={key} style={{ marginBottom: 4 }}>
            <strong>{key}:</strong> {String(value)}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default FeatureFlagsCard;
