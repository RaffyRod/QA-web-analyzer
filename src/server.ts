import express, { Request, Response } from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { AnalyzerService } from './services/analyzer.service.js';
import { findAvailablePort } from './utils/port-finder.util.js';
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
    return res.status(400).json({ error: 'Invalid URL format. Must start with http:// or https://' });
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

const startServer = async (): Promise<void> => {
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : await findAvailablePort(3000);

  app.listen(PORT, () => {
    console.log(`QA Web Analyzer server running on http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

