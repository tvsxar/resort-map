# AI-Assisted Workflow

## Tool used

I used OpenAI Codex through the VS Code extension during this code test.

Codex was used primarily as a mentor, requirements-review assistant, debugging partner, and testing guide. I remained responsible for the implementation decisions, writing and integrating the application code, running the project, verifying behavior, and maintaining the Git history.

## How I used AI

### Requirements and project analysis

Before starting implementation, I asked Codex to inspect the supplied archive and analyze:

- The original README
- Functional requirements
- Expected deliverables
- ASCII map and bookings formats
- Supplied image assets
- Required CLI arguments
- Existing project structure
- Testing expectations
- Possible ambiguities in the task

The purpose of this initial review was to make sure I understood the complete scope and did not accidentally miss a required deliverable.

A representative prompt was:

> Inspect the supplied archive completely, including the README, requirements, configuration, source files, tests, assets, and project structure. Do not make changes yet. Explain what is required, identify ambiguities, and recommend an architecture that stays strictly within the scope of the code test.

I also asked Codex to compare the completed application with the original requirements near the end of development. This review identified the remaining deliverables, including the single entrypoint, booking confirmation, AI workflow documentation, screenshot, and final README.

### Mentoring and implementation guidance

For most implementation steps, I asked Codex to act as a mentor rather than immediately provide a complete solution.

I commonly requested:

- A short explanation of the next objective
- The algorithm before the implementation
- Small hints when I was stuck
- An explanation of why a particular approach was suitable
- A review of my current code before continuing
- A complete example only when I could not make progress after attempting the task

Representative prompts included:

> Explain the next step and the reason for it, but do not show the complete code yet.

> Give me the algorithm and let me try to translate it into code.

> Review what I wrote and point out the exact mistake without rewriting the whole component.

> If I stay stuck for too long, give me a more direct hint or a small example.

This approach was useful for refreshing concepts while keeping the implementation process interactive.

### Backend guidance

Codex helped me review and reason about:

- Reading the map and bookings files
- Parsing CLI arguments with `process.argv`
- Default file paths
- Express application structure
- REST API responsibilities
- Cabana coordinates
- Guest validation
- In-memory availability
- Error handling
- Separation between the Express application and the listening server

I implemented the backend incrementally and asked Codex to review each completed step before moving to the next one.

### Debugging

I used Codex to help investigate errors after I reproduced them locally.

Examples included:

- Incorrect frontend and backend field names
- Missing function arguments
- Incorrect state updates
- Props that were expected but not passed
- Booking errors replacing the entire application view
- Cabana availability not updating visually
- CSS classes that affected text but not image assets
- Incorrect assumptions about how path tiles should connect

The debugging workflow was generally:

1. Reproduce the problem locally.
2. Show or describe the exact behavior.
3. Ask Codex to inspect the relevant files.
4. Understand the cause.
5. Apply the correction.
6. Test the behavior again.

A representative prompt was:

> Inspect the current files and explain why this specific error occurs. Tell me what values are actually being passed between the components and API.

### Backend testing assistance

I had previously used unit-test syntax but needed a refresher on API integration testing.

I asked Codex to help me:

- Decide what behavior was important to test
- Set up Vitest and Supertest
- Understand how Supertest calls an Express application
- Separate the Express app from the listening server
- Build the test suite one scenario at a time

The backend tests were developed incrementally around observable behavior:

- Health responses
- Map responses
- Valid bookings
- Missing request data
- Unknown guests
- Invalid cabana coordinates
- Duplicate bookings
- Availability updates

A representative prompt was:

> Help me understand how to decide what should be tested. Explain the behavior each test protects instead of only giving me the syntax.

### Frontend testing assistance

Frontend component testing was an area where I requested more direct assistance.

I asked Codex to help configure:

- Vitest
- jsdom
- React Testing Library
- jest-dom
- user-event
- Test cleanup

I then asked for the tests to be introduced one at a time, with each line explained before moving to the next scenario.

The frontend tests cover:

- Loading and displaying the map
- Opening the booking form
- Closing the booking form
- Required-field validation
- Displaying an API booking error
- Successful booking and unavailable cabana state

Representative prompts included:

> Show me one frontend test at a time and explain every line. I will type it manually so I can understand and remember the pattern.

> Explain the difference between `getByRole`, `findByRole`, and `queryByRole` using the current test.

> Explain how one mocked fetch function can return the map response first and the booking response second.

### Single entrypoint guidance

The task required one root command that launches both applications and accepts custom input-file arguments.

I asked Codex to explain the complete flow before implementing it:

- How a root npm script works
- Why a root `package.json` was needed
- What `npm start --` means
- How arguments are forwarded
- How `process.argv` receives them
- How `child_process.spawn` starts both applications
- How both processes are stopped together

A representative prompt was:

> Explain the command first: what each part means, why the project needs it, and how arguments reach the backend. Then help me build it in small steps.

### Documentation review

Codex helped organize the root README and check it against the deliverables in the original task.

The README was reviewed for:

- Installation instructions
- The single start command
- Custom map and bookings arguments
- Application usage
- Map symbols
- API routes
- Test commands
- Design decisions and trade-offs
- Screenshot reference
- Link to this AI workflow document

## Approximate workflow

The AI-assisted work was divided into the following major stages:

1. Requirements and archive analysis
2. Backend setup and file loading
3. REST API and booking logic
4. Backend automated tests
5. Frontend setup and map rendering
6. Cabana interaction and booking flow
7. Frontend automated tests
8. Single project entrypoint
9. Requirements re-check and documentation

Each stage involved several short iterations: implementation, local verification, code review, debugging, and a focused Git commit.

## Verification

AI suggestions were verified through local development rather than accepted without checking.

I used the following verification steps:

- Ran the backend and frontend locally
- Tested valid and invalid guest details
- Verified duplicate-booking behavior
- Checked cabana availability updates visually
- Tested default and custom CLI file arguments
- Ran backend automated tests
- Ran frontend automated tests
- Ran the frontend linter
- Created a production frontend build
- Reviewed the final project against the original requirements
- Kept implementation stages in separate Git commits

## Summary

Codex was used as a supporting development tool: to analyze requirements, refresh concepts, provide mentoring-style hints, assist with frontend and backend tests, review code, and help debug specific issues.

The application was developed iteratively, with each suggestion reviewed, applied where appropriate, and verified locally before moving to the next stage.
