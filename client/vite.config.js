import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { Auth } from './src/pages/Auth/Auth';
// import { Dashboard } from './src/pages/Dashboard/Dashboard';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        // Assuming these are your entry files for different pages
        app: './src/App',
        auth: './src/pages/Auth/Auth',
        dashboard: './src/pages/Dashboard/Dashboard',
        buyCard: './src/pages/BuyCard/BuyCard',
        buyCash: './src/pages/BuyCash/BuyCash',
        sellCard: './src/pages/SellCard/SellCard',
        sellCash: './src/pages/SellCash/SellCash',
        defi: './src/pages/Defi/Defi',
        exchange: './src/pages/Exchange/Exchange',
        // Add more entries as needed
      },
    },
  },
});
