import React from 'react';
import lightsaberImg from '../assets/lightsaber.jpeg';

const LightsaberIcon: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40, width: 160 }}>
    <img
      src={lightsaberImg}
      alt="lightsaber"
      style={{
        width: '60%',
        height: 'auto',
        maxWidth: 128,
        maxHeight: 128,
        border: '4px solid gold',
        borderRadius: 16,
        boxShadow: '0 0 32px 8px gold, 0 0 80px 16px #fff7',
        background: 'radial-gradient(circle, #fffbe6 60%, transparent 100%)',
        padding: 8,
        objectFit: 'contain',
        display: 'block'
      }}
    />
    <span style={{ fontSize: 18, color: '#bfa700', marginTop: 24, marginBottom: 24, textAlign: 'center', fontWeight: 'bold', maxWidth: 360, width: '100%', display: 'block' }}>
      You have received a gift... what will you do with it?
    </span>
  </div>
);

export default LightsaberIcon;
