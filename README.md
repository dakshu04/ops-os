# 🏗️ Ops-OS: Project Alpha

**Ops-OS** is a high-performance, Linear-style project management tool built for speed and simplicity. It replaces clunky Jira workflows with a fast, fluid, and mobile-responsive Kanban experience.

## 🎯 Initial Goal
Build a "Minimum Viable Product" (MVP) of a Kanban Board that feels premium (like Linear) but runs on a robust, scalable backend (Next.js + Supabase). We aimed to prove that we could build a full-stack drag-and-drop system in under 24 hours.

---

## ✅ Phase 1: The Foundation (Completed)
*Status: 🟢 Live & Functional*

We have successfully built the core engine. The app is no longer a prototype; it is a working full-stack application.

### **1. Architecture & Database**
* **Database:** Configured **Supabase (PostgreSQL)**.
* **ORM:** Integrated **Prisma (v6 Stable)** for type-safe database queries.
* **Schema:** Designed a "Linear-Style" schema including:
    * `readableId` (e.g., OPS-102).
    * `TaskStatus` (Enums: NEW, BACKLOG, IN_PROGRESS, DONE).
    * `User` & `Task` relations.

### **2. The Board (Frontend)**
* **Drag & Drop:** Implemented `@dnd-kit` for smooth physics-based dragging.
* **Mobile Responsive:**
    * **Desktop:** 4-Column Grid.
    * **Mobile:** Vertical Stack with Touch Sensor support (drag with thumb).
* **Optimistic UI:** The board updates *instantly* when you move, create, or delete a task. No loading spinners.

### **3. Actions (CRUD)**
* **Create:** "New Issue" button instantly creates tasks (auto-seeded with a demo user).
* **Read:** Fetches real data from Supabase, sorted by position.
* **Update:** Dragging a card saves the new status to the database immediately.
* **Delete:** Hovering over a card reveals a "Trash" icon to delete it instantly.

---

## 🚀 The Roadmap: Next 3 Phases

We are now moving from "Functional MVP" to "Production Ready Product".

### **Phase 2: The Details & Polish (Next Step)**
*Goal: Make the tasks actually useful, not just titles.*
* **Task Details Modal:** Clicking a card opens a Sheet/Modal to view details.
* **Rich Text Editor:** Add a Markdown editor for the Task Description.
* **Priority Picker:** Allow changing priority (Low, Medium, High, Urgent) with colored badges.
* **Edit Title:** Click the title to rename the task inline.

### **Phase 3: Auth & Multi-Tenancy**
*Goal: Stop using "Demo User" and let real users sign up.*
* **Authentication:** Integrate **Supabase Auth** or **Clerk**.
* **User Profile:** Show the actual logged-in user's avatar on the card.
* **RLS Policies:** Ensure users can only see *their* agency's tasks (Security).
* **Team View:** Assign tasks to specific team members.

### **Phase 4: "God Mode" Features**
*Goal: Add the advanced features that make Linear special.*
* **Keyboard Shortcuts:** Press `C` to create, `Delete` to remove.
* **Filters & Search:** "Show only My Tasks" or "Filter by Urgent".
* **Activity Log:** A history trail (e.g., *"Daksh moved OPS-102 to Done 2m ago"*).
* **Comments:** Add a chat section inside each task.

---

## 🛠️ Tech Stack
* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Database:** Supabase (PostgreSQL)
* **ORM:** Prisma
* **Styling:** Tailwind CSS + Shadcn UI
* **Drag & Drop:** @dnd-kit
* **Icons:** Lucide React

---

## ⚡ Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Setup Database (Supabase)
npx prisma db push

# 3. Run Development Server
npm run dev


# 🌊 User Journey: The Agency Workflow

This section outlines the ideal "Day in the Life" of an agency owner using Ops-OS. It demonstrates how the system handles the transition from **Planning** to **Execution** to **Automated Payout**.

### **The Scenario**
You have just signed a new client, **"Acme Corp"**, for a website redesign. You need to manage the work and ensure you get paid automatically upon completion.

---

### **Phase 1: The Setup (Planning)**
*Goal: Dump requirements out of your head and onto the board.*

1.  **Open the Board:** You see your clean, 4-column Kanban board.
2.  **Create Standard Tasks:**
    * Click **"New Issue"**.
    * Type: *"Design Home Page Mockup"*.
    * Set Priority to **High**.
    * *Result:* A standard card appears in the **New** column. This is internal work; finishing it does not trigger billing.
3.  **Create the "Money Task" (The Milestone):**
    * Click **"New Issue"** again.
    * Type: *"Final Website Deployment & Handoff"*.
    * **The Critical Step:** Check the box **`[✓] Mark as Billing Milestone`**.
    * *Result:* This card appears with a **Purple Border** and a **"BILLING"** badge. This visual cue indicates that moving this card has financial consequences.

---

### **Phase 2: The Execution (The Grind)**
*Goal: Execute the work transparently.*

1.  **Start Work:**
    * Drag *"Design Home Page"* from **New** → **In Progress**.
    * *System Action:* Database updates instantly. Team members see the status change in real-time.
2.  **Complete Tasks:**
    * Finish the design work.
    * Drag the card to **Done**.
    * *System Action:* The card rests in the Done column. No emails are sent. It is simply progress tracked.

---

### **Phase 3: The Payoff (Automation)**
*Goal: Deliver the project and get paid without admin work.*

1.  **The Trigger Move:** You grab the purple **"Final Handoff"** card (The Milestone).
2.  **The Drop:** You drag it into the **Done** column.
3.  **The System Reaction (Invisible Magic):**
    * The system detects `isMilestone === true`.
    * The system detects `status === DONE`.
    * **Action:** It immediately fires a server-side Webhook to your automation engine (n8n/Zapier).
4.  **The Outcome:**
    * **Client:** Receives an automated email: *"Your project is complete. Here is the final invoice."*
    * **You:** Receive a Slack notification: *"Invoice #1024 sent to Acme Corp ($5,000)."*

---

### **Summary of Experience**
* **For You:** It feels like moving a sticky note. Simple, tactile, fast.
* **For the Client:** They receive timely communication and professional invoicing without manual delays.
* **The Result:** You spend less time on admin and more time designing.




# **The Master Checklist**
[UI] The "New Task" Dialog: Replace the simple button with a professional Shadcn form (Title, Description, Priority, Milestone).✅

[UI] Task Details View: Make cards clickable to open a sheet/modal where you can read and edit the full description.✅

[UI] Priority & Badges: Add visual badges for Low/Medium/High/Urgent priorities on the card.✅

[Auth] Supabase Auth Integration: Stop using "Demo User" and allow Google/Email login.

[DB] Multi-Tenancy Schema: Update database to support Projects and Clients (not just Tasks).

[UI] Project Switcher: Update Sidebar to switch between different Client projects.

[Feature] Rich Text Editor: Add Markdown support for task descriptions.

[Automation] Webhook Trigger: Connect the "Milestone" drop to an actual API endpoint (n8n/Zapier).

[Optimization] Real-time Sync: Use Supabase Realtime so the board updates if someone else moves a card.

[Deploy] Vercel Deployment: Push the final app to the live web.