const fs = require('fs');
const path = require('path');

async function prerender() {
  const distPath = path.resolve(__dirname, '..', 'dist');
  const indexPath = path.join(distPath, 'index.html');
  const serverEntryPath = path.join(distPath, 'server', 'entry-server.js');

  if (!fs.existsSync(indexPath) || !fs.existsSync(serverEntryPath)) {
    console.log('[Prerender] Skipping: dist files not found');
    return;
  }

  try {
    const { render } = await import(serverEntryPath);
    let template = fs.readFileSync(indexPath, 'utf-8');
    const appHtml = render('/');

    if (appHtml) {
      if (template.includes('<!--app-html-->')) {
        template = template.replace('<!--app-html-->', appHtml);
      } else {
        template = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
      }
      fs.writeFileSync(indexPath, template, 'utf-8');
      console.log(`[Prerender] Successfully pre-rendered dist/index.html (${appHtml.length} bytes rendered)`);
    }
  } catch (err) {
    console.error('[Prerender] Warning: could not prerender index.html:', err);
  }
}

prerender();
