# Profile Starter
Demo site: https://www.lemus.dev/

This is a full stack that displays a profile feed of users. These users can edit their own profiles.

Authentication was done by using Clerk, to avoid building solution. The frontend is done with Next.js with Tanstack query making calls to the backend. The edit form is done using react-form, and all styling is done using tailwind with shadcn as it's component library.

The backend database model is as follows:
User:
    - Contains info that will be directly managed by Clerk, should only used for email.
    - Has a one-to-one relation with Profile
Profile:
    - Contains all the information for the user(bio, headline, photo url, etc)
    - Has a many to many relation to profile tags
Tag:
    - Contains interests
    - has a many to many relationship to profile tags
ProfileTag:
    - Join table for a Profile's tags.


### Apps and Packages

    .
    ├── apps
    │   ├── api                       # NestJS app (https://nestjs.com).
    │   └── web                       # Next.js app (https://nextjs.org).
    └── packages
        ├── @repo/eslint-config       # `eslint` configurations (includes `prettier`)
        ├── @repo/typescript-config   # `tsconfig.json`s used throughout the monorepo
        └── @repo/ui                  #  shaddn components


#### Build

```bash
# Will build all the app & packages with the supported `build` script.
pnpm run build

# ℹ️ If you plan to only build apps individually,
# Please make sure you've built the packages first.
```

#### Develop

```bash
# start up database using provided dockerfile:
podman-compose up -d
# Will run the development server for all the app & packages with the supported `dev` script.
pnpm run dev
```

#### Lint

```bash
# Will lint all the app & packages with the supported `lint` script.
# See `@repo/eslint-config` to customize the behavior.
pnpm run lint
```

#### Format

```bash
# Will format all the supported `.ts,.js,json,.tsx,.jsx` files.
# See `@repo/eslint-config/prettier-base.js` to customize the behavior.
pnpm format
```