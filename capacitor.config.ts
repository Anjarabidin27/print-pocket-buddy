import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9ef454098d1b47f39ed78f2e102fd52a',
  appName: 'print-pocket-buddy',
  webDir: 'dist',
  server: {
    url: 'https://9ef45409-8d1b-47f3-9ed7-8f2e102fd52a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0ea5e9',
      showSpinner: false
    }
  }
};

export default config;