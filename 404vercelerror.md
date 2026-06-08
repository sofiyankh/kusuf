# Resolving Vercel 404 and SSR Deployment Issues
## Project: TanStack Start + Nitro SSR

This document details the step-by-step process used to resolve the 404 errors and blank page issues encountered when deploying the TanStack Start application to Vercel.

---

### 1. The Initial Symptom (The 404 Error)
Upon deployment, the homepage might load, but any nested routes (e.g., `/shop`, `/admin`) returned a Vercel 404 page. In some cases, even the homepage returned a 404.

#### The Root Cause
The project was being deployed as a **Static SPA (Single Page Application)**. Vercel was looking for physical files in `dist/client` and, when it couldn't find them, it triggered a 404. Because it was a TanStack Start project, it required a **Server-Side Runtime** (SSR) to handle the routing and initial HTML generation, but that runtime was never being executed.

---

### 2. Phase 1: Removing the "Static" Constraints
The first major mistake was a legacy `vercel.json` file that forced Vercel into a static mindset.

**Step 1: Delete `vercel.json`**
We removed the `vercel.json` file entirely. 
* **Why?** It contained `outputDirectory: "dist/client"` and `rewrites` to `index.html`. This told Vercel: "Ignore the server, just serve these static files." For an SSR project, Nitro needs to control the deployment structure, and a hardcoded `vercel.json` often conflicts with Nitro's Vercel preset.

**Step 2: Rename/Remove the root `index.html`**
We renamed the root `index.html` to `_index.html`.
* **Why?** In a standard Vite SPA, the root `index.html` is the entry point. In TanStack Start SSR, the **Server** generates the HTML shell dynamically. If a static `index.html` exists in the deployment root, Vercel will serve that file as a static asset before your server even gets a chance to run. This resulted in a "blank page" because the static HTML was pointing to raw source files (`/src/client-entry.tsx`) instead of the production bundle.

---

### 3. Phase 2: Wiring the Nitro SSR Engine
TanStack Start uses **Nitro** to package the app for different providers (Vercel, Netlify, Cloudflare, etc.). We had to ensure Nitro was explicitly targeting Vercel's **Build Output API**.

**Step 3: Explicitly Configure `vite.config.ts`**
We updated `vite.config.ts` to include a verbose Nitro configuration:

```typescript
export default defineConfig({
  nitro: {
    preset: "vercel",
    output: {
      dir: ".vercel/output",
      serverDir: ".vercel/output/functions/__server.func",
      publicDir: ".vercel/output/static",
    },
  },
});
```

* **The Presets**: Setting `preset: "vercel"` tells Nitro to create a `.vercel/output` folder.
* **The Functions**: By setting the `serverDir` to `functions/__server.func`, we created a **Vercel Lambda Function**. This is the "Server" in SSR. 
* **The Result**: When Vercel deploys, it sees the `functions` directory and knows it needs to run a Node.js server to handle requests, rather than just serving static files.

---

### 4. Phase 3: Environment and Data Validation
Once the server was running (confirmed by the `λ` symbol in Vercel logs), we encountered a "Something went wrong" error.

**Step 4: Fix Supabase Credentials**
We discovered the `SUPABASE_URL` was using an invalid or non-existent project ID.
* **Action**: Updated `.env` and **Vercel Environment Variables** with the correct `xuqbdbazdvujkhxszolj.supabase.co` URL and valid Publishable Key.
* **Redeploy**: Ran `vercel --prod` to push these secrets to the server.

---

### 5. Summary of the Correct Architecture
To avoid 404s in the future with this stack, the project must follow these rules:

1. **No Static Rewrites**: Never use `rewrites` to `index.html` in `vercel.json` for SSR.
2. **Nitro Control**: Let the Nitro preset handle the output structure.
3. **Lambda Handling**: Ensure the Build logs show a "Server" or "Lambda" being created.
4. **Shell Control**: The `RootShell` in `src/routes/__root.tsx` is what renders the `<html>` and `<head>` tags, not a static file on disk.

### Tools Used
* **Vercel CLI**: Used `vercel inspect` to view deployment metadata and `vercel build` to simulate the production output locally.
* **Nitro Debugging**: Used `DEBUG=nitro:*` to trace where the server entry points were being generated.
* **Curl**: Used to inspect raw HTML headers to confirm if the response was coming from `Server: Vercel` (Lambda) or `Cache: HIT` (Static).

---
**Status: Deployment Successful & Fully Functional.**
