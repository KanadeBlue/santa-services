import { useState } from 'react';
import Router from 'next/router';

export default function Setup() {
  const [smtpSettings, setSmtpSettings] = useState({
    smtpServer: '',
    smtpPort: '',
    smtpUser: '',
    smtpPassword: ''
  });

  const handleSetup = async (e) => {
    e.preventDefault();
    // Call API to save the SMTP settings
    const res = await fetch('/api/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(smtpSettings),
    });

    if (res.ok) {
      Router.push('/'); // Redirect to dashboard if setup is successful
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">SMTP Setup</h1>
      <form onSubmit={handleSetup} className="space-y-4">
        <input
          type="text"
          placeholder="SMTP Server"
          value={smtpSettings.smtpServer}
          onChange={(e) => setSmtpSettings({ ...smtpSettings, smtpServer: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="SMTP Port"
          value={smtpSettings.smtpPort}
          onChange={(e) => setSmtpSettings({ ...smtpSettings, smtpPort: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="SMTP User"
          value={smtpSettings.smtpUser}
          onChange={(e) => setSmtpSettings({ ...smtpSettings, smtpUser: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="SMTP Password"
          value={smtpSettings.smtpPassword}
          onChange={(e) => setSmtpSettings({ ...smtpSettings, smtpPassword: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Save Settings</button>
      </form>
    </div>
  );
}
