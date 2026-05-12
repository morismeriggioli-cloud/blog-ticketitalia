"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, Sparkles } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setMessage("Inserisci un indirizzo email valido.");
      return;
    }

    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        alreadySubscribed?: boolean;
        error?: string;
      };

      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(
          data.alreadySubscribed
            ? "Eri già iscritto: tutto a posto, continuerai a ricevere le novità."
            : "Iscrizione confermata. Controlla la posta: ti scriviamo solo quando merita.",
        );
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Iscrizione non riuscita, riprova più tardi.");
      }
    } catch {
      setStatus("error");
      setMessage("Connessione non riuscita. Riprova tra poco.");
    }
  }

  const isLoading = status === "loading";

  return (
    <section id="newsletter" className="bg-white py-16 sm:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-md bg-primary-500 text-neutral-950 shadow-glow">
          <div className="absolute inset-0 event-grid opacity-25 mix-blend-multiply" aria-hidden="true" />
          <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:p-14">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-md bg-ink px-3 py-1 text-sm font-black text-white">
                <Sparkles className="size-4 text-primary-500" aria-hidden="true" />
                Backstage pass
              </span>
              <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-normal sm:text-6xl">
                Il meglio degli eventi prima che diventi sold out.
              </h2>
              <p className="mt-4 max-w-xl text-lg font-semibold leading-8 text-neutral-950/72">
                Una mail essenziale con nuove date, guide pratiche e idee per il weekend. Niente rumore, solo cose da vivere.
              </p>
            </div>

            {status === "success" ? (
              <div className="self-end rounded-md border border-ink/12 bg-white p-6 shadow-lift">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-success" aria-hidden="true" />
                  <div>
                    <p className="text-lg font-black text-ink">Ci sei.</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-muted">{message}</p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="self-end rounded-md border border-ink/12 bg-white p-4 shadow-lift">
                <label htmlFor="newsletter-email" className="mb-3 block text-sm font-black uppercase tracking-normal text-muted">
                  Email
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden="true" />
                    <input
                      id="newsletter-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      aria-invalid={status === "error"}
                      placeholder="nome@email.it"
                      className="h-12 w-full rounded-md border border-line bg-white pl-12 pr-4 text-ink outline-none placeholder:text-muted/60 focus:border-ink focus:ring-4 focus:ring-secondary-500/30 disabled:opacity-60"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-ink px-5 font-black text-white transition hover:bg-coral disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        Iscrizione…
                      </>
                    ) : (
                      "Iscrivimi"
                    )}
                  </button>
                </div>
                {status === "error" ? (
                  <p role="alert" className="mt-3 text-xs font-bold leading-5 text-coral">
                    {message}
                  </p>
                ) : (
                  <p className="mt-3 text-xs font-semibold leading-5 text-muted">
                    Arriva solo quando c&apos;e qualcosa che merita davvero attenzione. Niente spam, disiscrizione con un click.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
