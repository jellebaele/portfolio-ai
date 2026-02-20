import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import LoadingScreen from './components/LoadingScreen.tsx';
import { LanguageProvider } from './context/LuanguageContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ComposeProviders } from './utils/ComposeProviders.tsx';

const queryClient = new QueryClient();
const providers = [ThemeProvider, LanguageProvider];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<LoadingScreen />}>
      <QueryClientProvider client={queryClient}>
        <ComposeProviders providers={providers}>
          <App />
        </ComposeProviders>
      </QueryClientProvider>
    </Suspense>
  </StrictMode>
);
