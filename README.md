# CollaborAid Project
To build and run follow these steps:

1. Install bun.sh
For windows:
`powershell -c "irm bun.sh/install.ps1 | iex"`

For Linux/MacOS:
`curl -fsSL https://bun.sh/install | bash`

3. Once you're at the root of repository run:
`bun install`

5. Start the database:
`bun src/back/manageDatabase.ts`

7. Open new terminal at the same location and run the following:
`bun run dev`
