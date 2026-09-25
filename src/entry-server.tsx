import React, { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { CustomPortfolioData } from './types/portfolioBuilder';

export function render(url: string = '/', initialData?: CustomPortfolioData): string {
  return renderToString(
    <StrictMode>
      <App initialUrl={url} initialData={initialData} />
    </StrictMode>
  );
}
