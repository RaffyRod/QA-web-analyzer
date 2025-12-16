/**
 * @author RaffyRod (https://github.com/RaffyRod)
 */

import express, { Request, Response } from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { AnalyzerService } from './services/analyzer.service.js';
import { findAvailablePort, isPortAvailable } from './utils/port-finder.util.js';
import type { AnalyzeRequest, AnalysisOptions } from './types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const analyzerService = new AnalyzerService();

app.use(cors());
app.use(express.json());

// Disable caching in development
const isDevelopment = process.env.NODE_ENV !== 'production';
if (isDevelopment) {
  app.use((_req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    next();
  });
}

app.use(express.static(join(__dirname, '../public')));

const DEFAULT_OPTIONS: AnalysisOptions = {
  checkImages: true,
  checkLinks: true,
  checkButtons: true,
  checkInputs: true,
  checkRoles: true,
  checkHeadings: false,
  checkTables: false,
  checkFormElements: false,
  checkAltText: true,
  checkAriaLabel: true,
  checkAriaLabelledby: true,
  checkAriaDescribedby: true,
  checkAriaHidden: false,
  checkAriaExpanded: false,
  checkAriaControls: false,
  checkAriaCurrent: false,
  checkAriaRequired: false,
  checkAriaInvalid: false,
  checkAriaChecked: false,
  checkAriaDisabled: false,
  checkAriaPressed: false,
  checkAriaBusy: false,
  checkAriaLive: false,
  checkTabIndex: false,
  checkLang: false,
  checkLabels: true,
  checkTitle: true,
  checkFocusStates: true,
  checkHref: false,
  checkAutocomplete: false,
  checkRequired: false,
};

app.post('/api/analyze', async (req: Request<{}, {}, AnalyzeRequest>, res: Response) => {
  const { url, options } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  if (typeof url !== 'string' || (!url.startsWith('http://') && !url.startsWith('https://'))) {
    return res
      .status(400)
      .json({ error: 'Invalid URL format. Must start with http:// or https://' });
  }

  const analysisOptions: AnalysisOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  try {
    const results = await analyzerService.analyzePage(url, analysisOptions);
    return res.status(200).json(results);
  } catch (error) {
    console.error('❌ Analysis error:', error);
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');

    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze page';
    const errorDetails =
      error instanceof Error && error.stack
        ? error.stack.split('\n').slice(0, 5).join('\n')
        : String(error);

    return res.status(500).json({
      error: 'Failed to analyze page',
      message: errorMessage,
      details: process.env.NODE_ENV !== 'production' ? errorDetails : undefined,
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * Finds an available port with priority strategy:
 * Uses ports 4000-4005 and 5000-5005 which are rarely used by common frameworks on Mac/Windows
 * If all are occupied, finds any available port starting from 4000
 * @returns Promise resolving to an available port number
 */
const findPortWithPriority = async (): Promise<number> => {
  // Use ports 4000-4005 and 5000-5005 which are rarely used by common frameworks
  // (React, Next.js, Express typically use 3000-3999)
  const preferredPorts = [4000, 4001, 4002, 4003, 4004, 4005, 5000, 5001, 5002, 5003, 5004, 5005];

  for (const port of preferredPorts) {
    const isAvailable = await isPortAvailable(port);
    if (isAvailable) {
      return port;
    }
  }

  // If all preferred ports are occupied, find any available port starting from 4000
  return await findAvailablePort(4000);
};

const startServer = async (): Promise<void> => {
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : await findPortWithPriority();

  app.listen(PORT, () => {
    console.log('\n' + '='.repeat(70));
    console.log('🚀  QA WEB ANALYZER - BACKEND SERVER');
    console.log('='.repeat(70));
    console.log(`✅  Server deployed on: http://localhost:${PORT}`);
    console.log(`📡  API endpoint:      http://localhost:${PORT}/api/analyze`);
    console.log('='.repeat(70));
    console.log(`\n💡  Open this URL in your browser: http://localhost:${PORT}\n`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
