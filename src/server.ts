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
app.use(express.static(join(__dirname, '../public')));

const DEFAULT_OPTIONS: AnalysisOptions = {
  checkImages: true,
  checkLinks: true,
  checkButtons: true,
  checkInputs: true,
  checkRoles: true,
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
  checkTabIndex: false,
  checkLang: false,
  checkLabels: true,
  checkTitle: true,
  checkFocusStates: true,
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
    return res.json(results);
  } catch (error) {
    console.error('Analysis error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze page';
    return res.status(500).json({
      error: 'Failed to analyze page',
      message: errorMessage,
    });
  }
});

/**
 * Finds an available port with priority strategy:
 * 1. Try ports 3002-3005 first (avoiding 3000 and 3001)
 * 2. If those 4 ports are occupied, fall back to 3000 or 3001 if available
 * 3. If all are occupied, find any available port starting from 3000
 * @returns Promise resolving to an available port number
 */
const findPortWithPriority = async (): Promise<number> => {
  // First, try alternative ports (3002-3005) to avoid 3000 and 3001
  const alternativePorts = [3002, 3003, 3004, 3005];

  for (const port of alternativePorts) {
    const isAvailable = await isPortAvailable(port);
    if (isAvailable) {
      return port;
    }
  }

  // If all 4 alternative ports are occupied, try 3000 and 3001 as fallback
  const fallbackPorts = [3000, 3001];

  for (const port of fallbackPorts) {
    const isAvailable = await isPortAvailable(port);
    if (isAvailable) {
      return port;
    }
  }

  // If all preferred ports are occupied, find any available port starting from 3000
  return await findAvailablePort(3000);
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
