/**
 * Scheduler cron per la pipeline agenti.
 * Esegue ogni lunedì e venerdì alle 08:00 (Europe/Rome).
 *
 * Uso: tsx agents/cron.ts
 */

import cron from "node-cron";
import { runAutoPublishPipeline } from "./orchestrator.js";
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

const SCHEDULE_MON = "0 8 * * 1";
const SCHEDULE_FRI = "0 8 * * 5";

log("Scheduler avviato. Pipeline: lunedì e venerdì ore 08:00 (Europe/Rome)");

async function runAndLog() {
  log("Pipeline auto-publish avviata dallo scheduler");
  try {
    await runAutoPublishPipeline();
    log("Pipeline completata con successo");
  } catch (err) {
    log(`Errore pipeline: ${String(err)}`);
  }
}

cron.schedule(SCHEDULE_MON, runAndLog, { timezone: "Europe/Rome" });
cron.schedule(SCHEDULE_FRI, runAndLog, { timezone: "Europe/Rome" });
