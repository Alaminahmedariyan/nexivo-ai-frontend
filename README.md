# ⚡ Nexivo AI Frontend

### AI-Powered Agency Management Platform

Nexivo AI Frontend is a modern, scalable **AI Agency SaaS web application** built with **Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, TanStack Query, Zustand, React Hook Form, Zod, and Stripe**.

The application provides a polished interface for managing agency operations across **leads, clients, projects, proposals, invoices, payments, AI workflows, notifications, and content management**.

It is designed to work seamlessly with the **Nexivo AI Backend API** while maintaining a clean, reusable, and scalable frontend architecture.

---

## ✨ Highlights

* ⚡ Next.js 16 App Router
* ⚛️ React 19
* 🔷 TypeScript
* 🎨 Tailwind CSS 4
* 🧩 shadcn/ui + Radix UI
* 🔄 TanStack Query for server-state management
* 📊 TanStack Table for advanced data tables
* 🗂️ Zustand for client-side state management
* 📝 React Hook Form + Zod
* 💳 Stripe payment integration
* 🎞️ Framer Motion animations
* 🌙 Dark / Light theme support
* 🔔 Sonner toast notifications
* 📱 Responsive design
* 🔐 Better Auth integration
* ☎️ International phone number support
* 🧱 Reusable component architecture

---

# 🛠 Tech Stack

| Technology        | Version / Usage          |
| ----------------- | ------------------------ |
| Next.js           | 16.3.0                   |
| React             | 19.2.8                   |
| TypeScript        | 5.x                      |
| Tailwind CSS      | 4.x                      |
| shadcn/ui         | 4.16.2                   |
| Radix UI          | Accessible UI primitives |
| TanStack Query    | Server-state management  |
| TanStack Table    | Data tables              |
| Zustand           | Client-state management  |
| React Hook Form   | Form management          |
| Zod               | Form & data validation   |
| Stripe            | Payment integration      |
| Framer Motion     | Animations               |
| next-themes       | Theme management         |
| Sonner            | Toast notifications      |
| Lucide React      | Icons                    |
| date-fns          | Date utilities           |
| libphonenumber-js | Phone number utilities   |

---

# 🏗 Application Architecture

```text id="h8w2xl"
                        Nexivo AI Frontend
                               │
                    ┌──────────┴──────────┐
                    │                     │
                Public App           Authenticated App
                    │                     │
                    │              ┌──────┴──────┐
                    │              │             │
                    │           Admin        Workspace
                    │                          │
                    └──────────────┬───────────┘
                                   │
                             API / Auth Layer
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
              Nexivo Backend                 Better Auth
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
      PostgreSQL  Stripe  Cloudinary
```

The frontend separates:

```text id="iy9yvh"
UI
↓
Hooks
↓
State / Query Layer
↓
API Layer
↓
Backend API
```

This keeps presentation logic separate from server communication and application state.

---

# 📂 Project Structure

```text id="05kvd5"
nexivo-ai-frontend/
│
├── app/
│   ├── (public)/
│   ├── (auth)/
│   ├── dashboard/
│   ├── leads/
│   ├── clients/
│   ├── projects/
│   ├── proposals/
│   ├── invoices/
│   ├── payments/
│   ├── ai/
│   ├── notifications/
│   └── settings/
│
├── components/
│   ├── ui/
│   ├── forms/
│   ├── tables/
│   ├── dashboard/
│   ├── layout/
│   └── shared/
│
├── hooks/
│
├── lib/
│   ├── api/
│   ├── auth/
│   ├── query/
│   ├── validations/
│   └── utils/
│
├── store/
│
├── types/
│
├── public/
│
├── next.config.ts
├── package.json
├── tsconfig.json
├── postcss.config.mjs
└── README.md
```

> The exact directory structure can evolve as the application grows, but the architecture is designed around reusable modules and separation of concerns.

---

# 🌐 Application Areas

## 🏠 Public Website

The public experience can include:

* Agency landing page
* Services
* Service packages
* Portfolio
* Technologies
* Testimonials
* Contact / quote forms
* Newsletter subscription
* Public AI entry points

---

# 🔐 Authentication

The frontend integrates with **Better Auth** for authentication.

Supported roles:

```text id="w3uyqh"
SUPER_ADMIN
ADMIN
TEAM_MEMBER
CLIENT
USER
```

Authentication flows include:

```text id="s6z8yu"
/login
/register
/forgot-password
/reset-password
```

Authenticated areas are protected according to the user's role and application permissions.

---

# 👑 Admin Dashboard

The administration interface is designed to provide centralized control over the agency platform.

Core areas:

```text id="9xknn0"
Dashboard
├── Users
├── Leads
├── Clients
├── Projects
├── Services
├── Packages
├── Portfolios
├── Technologies
├── Testimonials
├── Site Settings
├── Invoices
├── Payments
├── AI
├── Notifications
├── Activity Logs
└── API Keys
```

---

# 👨‍💻 Team Workspace

Team members can work with:

* Assigned leads
* Clients
* Projects
* Milestones
* Timelines
* Project files
* Proposals
* AI workflows
* Notifications

---

# 🤝 Client Portal

The client-facing workspace can provide access to:

* Projects
* Project progress
* Milestones
* Timelines
* Files
* Proposals
* Invoices
* Payments
* Notifications

---

# 📩 Lead Management

The frontend supports a complete lead-management workflow:

```text id="j5qkda"
NEW
  ↓
CONTACTED
  ↓
QUOTED
  ↓
MEETING_SCHEDULED
  ↓
NEGOTIATION
  ↓
WON / LOST
```

Lead interfaces can include:

* Search
* Filtering
* Sorting
* Pagination
* Lead details
* Assignment
* Status management
* Conversion workflow
* Meeting scheduling

---

# 📁 Project Management

Projects are organized into dedicated sections:

```text id="q6s7cs"
Project
├── Overview
├── Members
├── Milestones
├── Timeline
├── Files
├── Proposals
└── Invoices
```

The interface supports project progress tracking and team collaboration.

---

# 🤖 AI Workspace

AI is a major part of the Nexivo experience.

## AI Conversations

The UI can provide:

```text id="1wv2cr"
Conversation List
       ↓
Conversation View
       ↓
Message Composer
       ↓
AI Response
```

## AI Proposals

Users can:

* Generate proposals
* Review proposal content
* Edit proposal information
* Change proposal status
* Accept proposals

## AI Usage

The admin/team interface can display:

* AI usage
* Token usage
* AI execution history
* Workflow executions

---

# 💳 Billing & Payments

Nexivo uses **Stripe** for online payments.

Frontend billing flow:

```text id="l6m9i1"
Project
   ↓
Invoice
   ↓
Checkout
   ↓
Stripe
   ↓
Payment
   ↓
Updated Invoice
```

Stripe integration is handled with:

```text id="3u4jpr"
@stripe/stripe-js
@stripe/react-stripe-js
```

---

# 🔔 Notifications

The application includes a centralized notification experience:

```text id="4w6xqa"
Notification Center
├── All
├── Unread
├── Mark as Read
└── Mark All as Read
```

Notifications can relate to:

* Leads
* Projects
* Milestones
* Clients
* Proposals
* AI activity

---

# 📊 Data Tables

Advanced administrative tables are powered by:

```text id="q9j7cv"
@tanstack/react-table
```

Table functionality can include:

* Sorting
* Filtering
* Pagination
* Column management
* Row actions
* Search
* Responsive layouts

---

# 🔄 Server State Management

Server-side API data is managed with:

```text id="v6s4j8"
@tanstack/react-query
```

This provides a consistent approach to:

* Queries
* Mutations
* Cache management
* Refetching
* Loading states
* Error states
* Optimistic UI patterns

---

# 🗂️ Client State Management

Global client-side state is handled with:

```text id="dcxn8u"
Zustand
```

It can be used for application-level state such as:

* UI preferences
* Sidebar state
* Temporary workflow state
* Client-side session-related state
* Shared application state

---

# 📝 Forms & Validation

Forms use:

```text id="7klm2s"
React Hook Form
        +
Zod
```

Typical flow:

```text id="kn54h5"
User Input
    ↓
React Hook Form
    ↓
Zod Validation
    ↓
API Request
    ↓
Backend Validation
```

This provides consistent client-side validation while the backend remains the final source of truth.

---

# 🎨 UI System

The interface uses **shadcn/ui and Radix UI** to provide reusable accessible components.

Included primitives cover areas such as:

* Accordion
* Alert Dialog
* Avatar
* Checkbox
* Collapsible
* Dialog
* Dropdown Menu
* Label
* Popover
* Scroll Area
* Select
* Switch
* Tabs

This allows the application to maintain a consistent design system while remaining highly customizable.

---

# 🎞️ Animations

Interactive transitions and motion effects use:

```text id="p3a0yl"
Framer Motion
```

Animations can be used for:

* Page transitions
* Dialogs
* Cards
* Navigation
* Dashboard interactions
* Loading states

---

# 🌙 Theme System

Theme management uses:

```text id="x4z0si"
next-themes
```

Supported UI modes:

```text id="9m31og"
Light
Dark
System
```

---

# 🔔 Notifications & Feedback

User feedback is provided through:

```text id="kw4ywm"
Sonner
```

Used for:

* Success messages
* Error messages
* Form feedback
* API status feedback
* Background actions

---

# ☎️ Phone Number Support

International phone inputs and validation can be handled using:

```text id="6w7gqk"
libphonenumber-js
```

---

# 🔌 Backend Integration

The frontend communicates with the Nexivo backend using REST APIs.

Development API:

```text id="gyop9h"
http://localhost:5000/api/v1
```

Authentication API:

```text id="z5j5bp"
http://localhost:5000/api/auth
```

Example architecture:

```text id="r67dws"
Page
 ↓
React Hook / Query Hook
 ↓
API Client
 ↓
Nexivo Backend
 ↓
Database / External Service
```

---

# 🌍 Environment Variables

Create:

```text id="x8t0km"
.env.local
```

Example:

```env id="4t0jfr"
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_AUTH_URL=http://localhost:5000/api/auth
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

> Only public values should use the `NEXT_PUBLIC_` prefix. Never expose backend secrets, Stripe secret keys, database credentials, or private API keys in the frontend.

---

# 🚀 Getting Started

## 1. Clone

```bash id="7b82os"
git clone <repository-url>
cd nexivo-ai-frontend
```

## 2. Install Dependencies

Using pnpm:

```bash id="h5n4wq"
pnpm install
```

Using npm:

```bash id="j22qja"
npm install
```

Using yarn:

```bash id="6jo5hm"
yarn
```

## 3. Configure Environment

Create `.env.local` and configure the required public environment variables.

## 4. Start Development

```bash id="6wn3ij"
pnpm dev
```

or:

```bash id="4r2nm6"
npm run dev
```

Open:

```text id="fau9mk"
http://localhost:3000
```

---

# 🧰 Available Scripts

```bash id="j4p9s1"
pnpm dev
pnpm build
pnpm start
pnpm lint
```

| Command      | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Start development server |
| `pnpm build` | Create production build  |
| `pnpm start` | Start production server  |
| `pnpm lint`  | Run ESLint               |

---

# 🧪 Development Workflow

Recommended architecture:

```text id="c1x7hq"
Design
  ↓
Reusable UI
  ↓
Form / Validation
  ↓
Query / Mutation
  ↓
API Layer
  ↓
Backend
```

For data-heavy screens:

```text id="kz4m8h"
API
 ↓
TanStack Query
 ↓
Table / Components
 ↓
User Interaction
 ↓
Mutation
 ↓
Query Invalidation
```

---

# 🔒 Security

The frontend follows secure client-side practices:

* Protected application routes
* Role-aware UI
* Better Auth integration
* Backend-authoritative authorization
* Zod client validation
* Secure environment variable handling
* Stripe publishable key separation
* No backend secrets exposed in browser code

---

# 📱 Responsive Experience

The application is designed for:

```text id="avm7fc"
Desktop
Laptop
Tablet
Mobile
```

Layouts, tables, navigation, dialogs, and forms should adapt to smaller screens while preserving usability.

---

# 🚀 Production Build

Create a production build:

```bash id="g8l3j1"
pnpm build
```

Start the production server:

```bash id="s8d1gj"
pnpm start
```

The application can then be deployed to a compatible Next.js hosting platform.

---

# 🔗 Related Backend

### Nexivo AI Backend

The frontend is designed to consume the Nexivo AI backend, which provides:

* Authentication
* Users
* Leads
* Clients
* Projects
* AI workflows
* Proposals
* Invoices
* Payments
* Notifications
* Activity logs
* API integrations

---

# 👨‍💻 Author

**Alamin Ahmed**

Full Stack Developer

GitHub: [@Alaminahmedariyan](https://github.com/Alaminahmedariyan)

---

# 📄 License

This project is licensed under the ISC License.
