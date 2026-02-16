# ToInfinity.Web

A modern React application built with Vite, TypeScript, TanStack Query, React Router, and Material UI.

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **TanStack Query (React Query)** - Data fetching and caching
- **React Router v6** - Client-side routing
- **Material UI (MUI)** - Component library
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Zod** - Schema validation

## 📦 Project Structure

```
src/
├── components/        # Shared/reusable components
│   └── layout/       # Layout components
├── features/         # Feature-based modules
│   └── venues/       # Example feature
│       ├── api.ts
│       ├── hooks.ts
│       ├── types.ts
│       ├── components/
│       └── index.ts  # Public API
├── libs/             # Utility libraries
│   └── api-client.ts # Axios instance
├── pages/            # Page components
├── routes/           # Routing configuration
├── theme/            # MUI theme configuration
└── main.tsx          # Application entry point
```

## 🏗️ Architecture Principles

### Feature-Based Structure

- Each feature has its own folder with all related code
- Features export a public API via `index.ts`
- Components, hooks, types, and API calls are co-located

### API Integration Pattern

1. **API Functions** (`api.ts`) - Axios calls wrapped in functions
2. **Custom Hooks** (`hooks.ts`) - TanStack Query wrappers around API functions
3. **Components** - Use custom hooks, never call APIs directly

### Form Handling

- React Hook Form for form state management
- Zod schemas for validation
- Type-safe forms with TypeScript

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📝 Usage Examples

### Creating a New Feature

1. Create feature folder: `src/features/my-feature/`
2. Add type definitions: `types.ts`
3. Create API functions: `api.ts`
4. Create custom hooks: `hooks.ts`
5. Build components: `components/`
6. Export public API: `index.ts`

### Using TanStack Query Hooks

```typescript
import { useVenues, useCreateVenue } from "@/features/venues";

function VenuesPage() {
  const { data, isLoading, error } = useVenues();
  const createVenue = useCreateVenue();

  const handleCreate = (data) => {
    createVenue.mutate(data);
  };

  // ...
}
```

### Form with Validation

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
});

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // ...
}
```

## 🔒 Authentication

The API client automatically:

- Adds JWT token from localStorage to requests
- Redirects to login on 401 responses
- Handles token refresh (when implemented)

## 🎨 Theming

Customize the Material UI theme in `src/theme/theme.ts`:

```typescript
export const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
  // ...
});
```

## 📚 Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Router](https://reactrouter.com/)
- [Material UI](https://mui.com/)

## 📄 License

MIT

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
