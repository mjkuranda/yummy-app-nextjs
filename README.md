# Yummy Web Application

The client side application using [Yummy API](https://github.com/mjkuranda/yummy-app-nestjs/).

🚫 This source code is protected by copyright. Unauthorized copying, modification, distribution, or use is strictly prohibited.

## Technologies

This application was built using:
* Next.js 14
* TypeScript
* Bootstrap 5
* SCSS

## Getting Started

First, run the development server:

```bash
npm run dev
```

## Development

To release a new version, create your feature, changes or fix branch naming e.g. `feature/your-feature-name`.
Next, change a version in `package.json` file and add a new record to `CHANGELOG.md` file
including information what relevant was added, changed, fixed or removed.
Finally, change version number at 22nd line in `sidebar-content-footer.tsx`.

## Environmental variables

To make the application work correctly, the following environmental variables need to be added:
* `.env.local` file:
  * `NEXT_PUBLIC_APP_URL` - URL of application
  * `NEXT_PUBLIC_API_URL` - URL of API

## That's all
Good luck, have fun!