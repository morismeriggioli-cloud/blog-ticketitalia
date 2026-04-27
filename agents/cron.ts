/**
 * Scheduler cron per la pipeline agenti.
 * Esegue ogni lunedì e venerdì alle 08:00 (Europe/Rome).
 *
 * Uso: tsx agents/cron.ts
 */

import cron from "node-cron";
import { runAutoPublishPipeline } from "./orchestrator.js";

console.log("CRON AVVIATO - Railway online -", new Date().toISOString());

function log(msg: string) {
  console.log(`[${new Date().toISOString()}] ${msg}`);
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
