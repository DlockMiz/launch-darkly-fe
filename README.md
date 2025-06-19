# LaunchDarkly Comic Character React App

This is a React + TypeScript application that demonstrates LaunchDarkly feature flag integration, comic character selection, and interactive UI elements. It is built with Vite for fast development and includes a sample API integration for context posting.

## Features
- Choose a random Marvel/DC comic character (hero or villain)
- Feature flag-driven UI (power bar, kill/save buttons, lightsaber, etc.)
- Power level logic and interactive actions
- LaunchDarkly multi-context support and event tracking
- API POST to `/context` endpoint and display of response
- Modern, responsive UI

## Prerequisites
- Node.js (v18 or newer recommended)
- npm (v9 or newer recommended)

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd launch-darkly-fe
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure LaunchDarkly
- Create a `.env` file in the project root with your LaunchDarkly client-side ID:
  ```env
  VITE_LD_CLIENT_ID=your-client-side-id-here
  ```
- (Optional) Adjust feature flag keys in the code to match your LaunchDarkly project.

### 4. Run the development server
```bash
npm run dev
```
- The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 5. Build for production
```bash
npm run build
```
- Output will be in the `dist/` folder.

## API Integration
- The app expects a `/context` API endpoint (e.g., Flask or FastAPI backend) to POST user context and receive a response for display in the "The Voice" card.
- You can configure the API URL in `App.tsx` if needed.

## Project Structure
- `src/` — Main React source code
- `src/components/` — UI components (ChooseCharacterButton, FeatureFlagsCard, etc.)
- `src/types/` — TypeScript types
- `public/` — Static assets

## Customization
- Update comic character data in `src/types/ComicCharacter.ts` as needed.
- Adjust feature flag keys and logic in `App.tsx` and components.
