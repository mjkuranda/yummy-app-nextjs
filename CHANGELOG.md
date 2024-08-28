# Changelog
All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.39.0] - 2024-08-28
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Capability to add the ratings for the meals. 
- [Marek Kurańda](https://github.com/mjkuranda): `TextButton` component.

## [1.38.0] - 2024-08-27
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Capability to add the comments for the meals.
- [Marek Kurańda](https://github.com/mjkuranda): Rendering all comments of a specific meal.
- [Marek Kurańda](https://github.com/mjkuranda): Refreshing comments one every minute.

## [1.37.0] - 2024-08-27
### Changed
- [Marek Kurańda](https://github.com/mjkuranda): Rendering Polish translations of ingredients at search and create page.

## [1.36.1] - 2024-08-24
### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Meal proposals.

## [1.36.0] - 2024-08-23
### Changed
- [Marek Kurańda](https://github.com/mjkuranda): User activation via ID.

## [1.35.0] - 2024-08-23
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `ApiError` class and API error handling.

## [1.34.0] - 2024-08-22
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Integration with API related to creating a new meal.

## [1.33.0] - 2024-08-22
### Changed
- [Marek Kurańda](https://github.com/mjkuranda): Meal form creation layout dividing into two parts.

## [1.32.0] - 2024-08-22
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `AddButton` component as combination of icon and text.
- [Marek Kurańda](https://github.com/mjkuranda): `RemoveButton` component as combination of icon and text.
- [Marek Kurańda](https://github.com/mjkuranda): The ability to remove sections and section steps within a recipe.

### Changed
- [Marek Kurańda](https://github.com/mjkuranda): Substituted adding button at meal creation page for `AddButton`.

## [1.31.1] - 2024-08-22
### Changed
- [Marek Kurańda](https://github.com/mjkuranda): At least 2 steps for the first recipe section are required.
- [Marek Kurańda](https://github.com/mjkuranda): When an error occurs, then create button is blocked.

### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Rendering values between image URL and file.

## [1.31.0] - 2024-08-21
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `/meals/create` page for creating new meals.
- [Marek Kurańda](https://github.com/mjkuranda): `InputList` component integrating `Autocomplete` from `MUI` library.
- [Marek Kurańda](https://github.com/mjkuranda): `InputImage` component for uploading images.
- [Marek Kurańda](https://github.com/mjkuranda): `InputSelect` component for selecting one of many options.
- [Marek Kurańda](https://github.com/mjkuranda): `InputCheckbox` component for checking option.

## [1.30.0] - 2024-08-21
### Changed
- [Marek Kurańda](https://github.com/mjkuranda): Simplified recipe step structure to `string`.

## [1.29.0] - 2024-08-21
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Info about no recipe from author.

### Changed
- [Marek Kurańda](https://github.com/mjkuranda): Divided `MealContainer` content into a few components.
- [Marek Kurańda](https://github.com/mjkuranda): Some of API types to make it up to date.

## [1.28.0] - 2024-08-17
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `react-hook-form` library.
- [Marek Kurańda](https://github.com/mjkuranda): error messaging in `InputString` and `InputPassword`.
- [Marek Kurańda](https://github.com/mjkuranda): user registering capability at `users/registration`.

### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): toasts visibility.

## [1.27.0] - 2024-08-16
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `Loader` component.

## [1.26.0] - 2024-08-16
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `toastify` library, custom toasts and toast where were needed.

## [1.25.0] - 2024-08-14
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `/management` and `/management/[object]/[action]` pages.
- [Marek Kurańda](https://github.com/mjkuranda): Management panel allows to confirm adding, editing, deleting meals and activating not-activated users.
- [Marek Kurańda](https://github.com/mjkuranda): `Manage` link at landing page and header to allow redirection to `/management` page.

### Changed
- [Marek Kurańda](https://github.com/mjkuranda): For default `apiPost` payload type is `undefined`.

### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Page height.

## [1.24.0] - 2024-07-25
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Receiving meal proposals.
- [Marek Kurańda](https://github.com/mjkuranda): Updating user preferences via sending search queries.

## [1.23.0] - 2024-07-24
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Saving information about currently logged-in user.
- [Marek Kurańda](https://github.com/mjkuranda): Logging in and out.

## [1.22.0] - 2024-07-12
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `@tanstack/react-query-devtools` for developing.
- [Marek Kurańda](https://github.com/mjkuranda): Searching meal at `search` page.
- [Marek Kurańda](https://github.com/mjkuranda): Checking ingredients provided in query.

## [1.21.0] - 2024-07-10
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Meal recipe details.

## [1.20.0] - 2024-07-10
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `/result/[id]` page for rendering meal details.

## [1.19.0] - 2024-07-09
### Added
- [Marek Kurańda](https://github.com/mjkuranda): API integration.
- [Marek Kurańda](https://github.com/mjkuranda): React Query library for caching requests and responses.
- [Marek Kurańda](https://github.com/mjkuranda): Constant directory for all application constants.

## [1.18.0] - 2024-07-03
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Login page.

## [1.17.1] - 2024-03-15
### Changed
- [Marek Kurańda](https://github.com/mjkuranda): Order of ingredient and image.

## [1.17.0] - 2024-03-15
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Grammage information for result ingredients at result page.

## [1.16.0] - 2024-03-13
### Changed
- [Marek Kurańda](https://github.com/mjkuranda): Almost all links to button components.

### Removed
- [Marek Kurańda](https://github.com/mjkuranda): `/test` directory.

## [1.15.0] - 2024-03-13
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `Material UI` library.
- [Marek Kurańda](https://github.com/mjkuranda): `InputString`, `InputAreaString`, `InputPassword` and `InputNumber` components.

## [1.14.0] - 2024-03-11
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `/meal-proposal` page for proposals of the best meals.
- [Marek Kurańda](https://github.com/mjkuranda): Initial code for user profile helper.

## [1.13.0] - 2024-03-07
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Folding and unfolding of search ingredients.

## [1.12.0] - 2024-03-07
### Changed
- [Marek Kurańda](https://github.com/mjkuranda): Search ingredient styling.

## [1.11.0] - 2024-03-06
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Button component.

### Changed
- [Marek Kurańda](https://github.com/mjkuranda): All `button` tags to `Button` component.

## [1.10.0] - 2024-03-06
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Search query form.

## [1.9.0] - 2024-03-05
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Result page.

## [1.8.0] - 2024-03-05
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `no-image` for result meal without image URL.
- [Marek Kurańda](https://github.com/mjkuranda): Meal results at search page.

## [1.7.0] - 2024-03-04
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Custom `not-found` page.

## [1.6.0] - 2024-03-04
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `react/jsx-tag-spacing` ESLint rule and plugin for React.
- [Marek Kurańda](https://github.com/mjkuranda): Search page and fetching all ingredient categories with ingredients.

## [1.5.0] - 2024-02-23
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Footer and Header common components.

## [1.4.0] - 2024-02-23
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Bootstrap 5.
- [Marek Kurańda](https://github.com/mjkuranda): Technology list in `README.md` file.
- [Marek Kurańda](https://github.com/mjkuranda): Initial home page with user bar.

## [1.3.0] - 2024-02-22
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `favicon.ico` for application tab.

### Changed
- [Marek Kurańda](https://github.com/mjkuranda): General project information in `README.md` file.

## [1.2.0] - 2024-02-22
### Added
- [Marek Kurańda](https://github.com/mjkuranda): SCSS preprocessor and styles.

## [1.1.0] - 2024-02-22
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `CHANGELOG.md` and `.gitignore` files.

## [1.0.0] - 2024-02-22
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Initial version of NextJS app.