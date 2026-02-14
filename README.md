# Rooted Operator

A premium dark-mode control panel for managing AI agents, tasks, content, and business operations.

## Features

- **Hub**: Dashboard overview with agent status, system health, and revenue tracking
- **Ops**: Real-time terminal logs, server status, and cron job monitoring
- **Agents**: Agent management with models and cost tracking
- **Tasks**: Kanban board and calendar view for task management
- **Chat**: Multi-channel communication with voice interface
- **Content**: Content pipeline for drafts and publishing
- **Comms**: Message center and CRM with client pipeline
- **Knowledge**: File browser and ecosystem product management
- **Code**: Repository monitoring and code pipeline

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Convex
- shadcn/ui
- Framer Motion
- Lucide Icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up Convex:
```bash
npx convex dev
```

3. Copy environment variables:
```bash
cp .env.local.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

## Design System

- Dark mode ONLY with deep slate/black backgrounds
- Glass cards with `bg-white/[0.03] backdrop-blur-xl`
- Consistent 16-20px border radius
- 10-14px font sizes for body text
- Mobile-first responsive design
- Stagger animations on card grids

## API Routes

- `/api/system-state` - System status
- `/api/agents` - Agent registry
- `/api/cron-health` - Cron job status
- `/api/revenue` - Revenue data
- `/api/content-pipeline` - Content queue
- `/api/tasks` - Task management
- `/api/chat-*` - Chat functionality
- `/api/health` - Health check

## License

MIT
