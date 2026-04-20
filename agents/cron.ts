/**
 * Scheduler cron per la pipeline agenti.
 * Esegue ogni lunedì alle 08:00.
 *
 * Uso: tsx agents/cron.ts
 */

import cron from "node-cron";
import { runPipeline } from "./orchestrator.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOG_DIR = path.join(__dirname, "..", "output", "logs");

function log(msg: string) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${msg}\n`;
  console.log(line.trim());
  fs.mkdirSync(LOG_DIR, { recursive: true });
  fs.appendFileSync(path.join(LOG_DIR, "cron.log"), line);
}

// Ogni lunedì alle 08:00
const SCHEDULE = "0 8 * * 1";

log(`Scheduler avviato. Pipeline programmata: ${SCHEDULE} (lunedì ore 08:00)`);

cron.schedule(
  SCHEDULE,
  async () => {
    log("Pipeline avviata dallo scheduler");
    try {
      await runPipeline();
      log("Pipeline completata con successo");
    } catch (err) {
      log(`Errore pipeline: ${String(err)}`);
    }
  },
  { timezone: "Europe/Rome" }
);
