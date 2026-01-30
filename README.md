# 🏗️ Ops-OS: The Agency Operating System

**Ops-OS** is a high-performance, Linear-style project management tool built specifically for modern agencies. It replaces clunky, slow workflows with a fast, fluid, and mobile-responsive Kanban experience designed to automate the agency lifecycle from "Planning" to "Payout."

## 🎯 The Vision
Most project management tools (Jira, Trello) are just lists of tasks. **Ops-OS is different.** It is built to bridge the gap between **doing the work** and **getting paid**. By integrating "Billing Milestones" directly into the workflow, we turn a standard Kanban board into a cash-flow engine.

---

## 🌊 The Agency Workflow (User Journey)
*A "Day in the Life" of an agency owner using Ops-OS.*

### **Phase 1: The Setup (Planning)**
*Goal: Organize client requirements instantly.*
1.  **Client Context:** You switch the sidebar to **"Acme Corp"**.
2.  **Standard Tasks:** You create internal tasks like *"Design Homepage"* (Priority: High).
3.  **The Money Move:** You create a special task: *"Final Website Handoff"*. You toggle **[✓] Mark as Billing Milestone**. The card glows with a purple "BILLING" badge.

### **Phase 2: The Execution (The Grind)**
*Goal: transparent, fast progress.*
1.  **Drag & Drop:** You move cards from **New** → **In Progress**. The UI updates instantly (optimistic updates).
2.  **Deep Work:** You click a card to open the **Task Details Sheet**. You write the full spec using the **Markdown Editor**, adding code snippets and checklists.
3.  **Updates:** You realize a task is blocked. You change the Priority to **Urgent** (Red Badge) so the team sees it immediately.

### **Phase 3: The Payoff (Automation)**
*Goal: Get paid without admin work.*
1.  **The Trigger:** You drag the purple **"Final Handoff"** card to **Done**.
2.  **The Magic:** The system detects a completed *Billing Milestone*. It fires a Webhook to your automation engine (n8n).
3.  **The Result:** The client automatically receives an invoice, and you get a Slack notification: *"Invoice Sent: $5,000"*.

---

## 🛠️ Tech Stack & Architecture
We built Ops-OS to prove that a full-stack, premium-feeling app can be scalable and robust.

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Database:** Supabase (PostgreSQL)
* **ORM:** Prisma (v6 Stable)
* **Styling:** Tailwind CSS + Shadcn UI
* **Drag & Drop:** @dnd-kit (Physics-based interactions)
* **Icons:** Lucide React

---

## ✅ The Master Checklist

### **Phase 1: The Core Engine (Completed)**
*The foundational features that make the app functional.*

- [x] **[UI] Enhanced "New Issue" Dialog**
    * Professional form with Title, Priority, Description, and Milestone toggle.
- [x] **[UI] Task Details View**
    * Clickable cards open a side-sheet/modal for full details.
    * Allows reading and editing without leaving the board context.
- [x] **[UI] Visual Priority Badges**
    * Color-coded badges: `Low` (Gray), `Medium` (Blue), `High` (Orange), `Urgent` (Red).
- [x] **[Feature] Rich Text Editor**
    * Markdown support for beautiful task descriptions (Lists, Code blocks, Headers).
- [x] **[Feature] Full CRUD Actions**
    * Create, Read, Update, and Delete tasks instantly from the UI.

### **Phase 2: Architecture & Scalability (Completed)**
*The backend logic supporting real users and multiple clients.*

- [x] **[Auth] Supabase Authentication**
    * Secure Google/Email login (replaced hardcoded demo users).
- [x] **[DB] Multi-Tenancy Schema**
    * Database supports **Clients** and **Projects**.
    * Strict data isolation: Users only see their agency's data.
- [x] **[UI] Project Switcher**
    * Sidebar updated to switch context between different Client projects easily.

### **Phase 3: The "Smart" Layer (In Progress)**
*Features that automate workflows and turn the tool into a business operating system.*

- [ ] **[Automation] Webhook Triggers**
    * Connect "Billing Milestone" completion to an external API (n8n/Zapier).
- [ ] **[Optimization] Real-Time Sync**
    * Implement **Supabase Realtime** so the board updates instantly for all team members.
- [ ] **[UI] Marketing Landing Page**
    * A high-converting homepage explaining the "Agency OS" value proposition.

### **Phase 4: Launch Readiness (Upcoming)**
*Final polish and deployment.*

- [ ] **[Deploy] Vercel Deployment**
    * Production build and live URL.
- [ ] **[Feature] Client "Read-Only" Portal** (Proposed)
    * A simplified view for clients to track progress without editing rights.
- [ ] **[Feature] Automated Invoicing** (Proposed)
    * Link Webhooks to Stripe/QuickBooks for zero-touch billing.