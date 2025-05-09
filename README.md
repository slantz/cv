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

## Use HTTPS for local development

When having a production build locally the session cookie for admin will be set as secure since
```typescript
secure: process.env.NODE_ENV === "production" && 
  (request.headers.get("x-forwarded-proto") === "https" || 
  request.url.startsWith("https://"))
```

so to not have an infinite loop issue locally when going to admin pages logged in as admin, the following should be set up:
1. `brew install mkcert`
2. `mkcert localhost 127.0.0.1 ::1` # or add other local IPs that are used as well, this will generate 2 *.pem files that are already in .gitignore

or another option to avoid the infinite loop for testing only locally would be to set secure: false and login on production build will be working finally over http.

## Firebase APP Hosting

This CV uses the Firebase App Hosting, for this to function several things needs to be done:
- `firebase init apphosting` which will create 3 files: `apphosting.yaml`, `.firebaserc`, `firebase.json`.
- `apphosting.yaml` defines the resources utilized and environment variables names stored in Cloud Secret Manager.
- then each for each environment variable firebase app hosting backend should get access to the cloud manager secret variable, like
`firebase apphosting:secrets:grantaccess --backend <BACKEND_NAME> --project <PROJECT_NAME> --location <PROJECT_LOCATION> ALLOWED_GITHUB_ID`.
