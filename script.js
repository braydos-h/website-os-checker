const info = {
  "User Agent": navigator.userAgent,
  "Platform": navigator.platform,
  "Languages": navigator.languages ? navigator.languages.join(', ') : navigator.language,
  "Device Memory (GB)": navigator.deviceMemory || 'Unknown',
  "Hardware Concurrency (CPUs)": navigator.hardwareConcurrency || 'Unknown',
  "Max Touch Points": navigator.maxTouchPoints || 'Unknown',
  "Screen Resolution": screen.width + 'x' + screen.height,
  "Color Depth": screen.colorDepth,
  "Online": navigator.onLine,
  "Cookies Enabled": navigator.cookieEnabled,
  "Time Zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
};

if ('connection' in navigator) {
  info['Connection Downlink (Mb/s)'] = navigator.connection.downlink;
  info['Connection Effective Type'] = navigator.connection.effectiveType;
}

function addEntry(dt, dd) {
  const dl = document.getElementById('info');
  const term = document.createElement('dt');
  term.textContent = dt;
  dl.appendChild(term);
  const def = document.createElement('dd');
  def.textContent = dd;
  dl.appendChild(def);
}

for (const [key, value] of Object.entries(info)) {
  addEntry(key, value);
}

if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      const descriptions = devices.map(d => d.kind + ': ' + (d.label || 'hidden by permission'));
      addEntry('Media Devices', descriptions.join('; '));
    })
    .catch(err => addEntry('Media Devices', 'Error: ' + err));
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      addEntry('Latitude', position.coords.latitude);
      addEntry('Longitude', position.coords.longitude);
    },
    err => addEntry('Geolocation', 'Error: ' + err.message)
  );
}
