# Monkey's Paw Generator Documentation

## Concept Context
The Monkey's Paw Generator is a web application where users submit a wish, and an AI (Gemini API) generates a darkly ironic short story. The AI is prompted to grant the wish technically but with a devastating and horrific cost, mimicking the supernatural "Monkey's Paw" trope.

## Decisions Made
- **Framework**: Next.js (App Router) for optimized routing and server-side capabilities.
- **Language**: TypeScript for type safety.
- **Styling**: Tailwind CSS for rapid, responsive atmospheric styling.
- **API**: `@google/generative-ai` SDK for direct communication with Gemini 1.5 Flash.
- **Security**: Route handlers (`/api/wish`) are used to keep the API key on the server and hide the system prompt from the client.

## Development Workflow
To ensure quality and consistency, follow this workflow:

1. **Research**: Research both on the project and the internet for any relevant information for the planning or implementation whenever needed.
2. **Branching**: Create a feature branch for any non-trivial feature or fix.
3. **Planning**: Create a detailed implementation plan and **ask for approval** from the user.
4. **Implementation**: Write the code according to the approved plan.
5. **Verification**: 
   - Run `npm run build` to ensure type safety and build success.
   - Run `npm run typecheck` (or check build output) to ensure no TypeScript errors.
   - Run `npm run lint` to ensure code style.
   - Run Prettier to format the code.
6. **Review**: **Ask for approval** on the implemented changes.
7. **Finalization**: If approved, commit and push the modifications. Otherwise, iterate on implementation.

**Important**: At the end of every step (planning, implementation, or commit), provide a concise summary of what has been completed for the feature.

## Next Tasks / Todos
- [ ] Implement robust error handling for API timeouts and quota limits.
- [ ] Add a "Share" feature to allow users to share their ironic fates.
- [ ] Enhance the loading animation with more "eerie" visual effects.
- [ ] Implement a rate-limiting system to prevent API abuse.
- [ ] Improve the typography by integrating a specialized Google Font (e.g., "Crimson Text").
