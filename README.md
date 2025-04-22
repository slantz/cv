# CV Project

This is a Next.js project for creating and displaying a CV/resume.

## Project Setup

This project uses [Bun](https://bun.sh/) as the JavaScript runtime and package manager.

### Prerequisites

- [Bun](https://bun.sh/) (latest version)

### Installation

```bash
# Install dependencies
bun install
```

### Development

```bash
# Start the development server
bun dev
```

### Building for Production

```bash
# Build the project
bun build

# Start the production server
bun start
```

## Migration from pnpm to Bun

This project was migrated from pnpm to Bun. The following changes were made:

1. Removed `pnpm-lock.yaml` file
2. Updated scripts in `package.json` to use Bun:
   - `"dev": "bun --bun run next dev"`
   - `"build": "bun --bun run next build"`
   - `"start": "bun --bun run next start"`
   - `"lint": "bun --bun run next lint"`
3. Added `bun.lockb` to `.gitignore` (was already present)

### Completing the Migration

To complete the migration, run:

```bash
# Install dependencies with Bun
bun install
```

This will generate the `bun.lockb` file and install all dependencies using Bun.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Firebase](https://firebase.google.com/)
