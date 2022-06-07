const config = {
  accessKey: process.env.RAPYD_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE or pass it as a system variable',
  secretKey: process.env.RAPYD_SECRET_KEY || 'YOUR_SECRET_KEY_HERE or pass it as a system variable',
  baseRapydApiUrl: process.env.BASERAPYDAPIURL || 'https://sandboxapi.rapyd.net',
  port: parseInt(process.env.PORT) || 4100,
};

export default config;
