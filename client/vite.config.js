import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { Auth } from './src/pages/Auth/Auth';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        // Assuming these are your entry files for different pages
        app: 'src/App.jsx',
        auth: './src/pages/Auth/Auth',
        dashboard: 'src/pages/Dashboard/Dashboard.jsx',
        buyCard: 'src/pages/BuyCard/BuyCard.jsx',
        buyCash: 'src/pages/BuyCash/BuyCash.jsx',
        sellCard: 'src/pages/SellCard/SellCard.jsx',
        sellCash: 'src/pages/SellCash/SellCash.jsx',
        defi: 'src/pages/Defi/Defi.jsx',
        exchange: 'src/pages/Exchange/Exchange.jsx',
        // Add more entries as needed
      },
    },
  },
});
