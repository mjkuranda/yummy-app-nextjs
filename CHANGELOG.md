# Changelog
All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.0] - 2025-03-15
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Mixin for different type of devices: `mobile`,`tablet` and `desktop`.
- [Marek Kurańda](https://github.com/mjkuranda): Responsive version of `header`, `footer`, landing page, search page and login page, registration page, dish details page, dish creation page, recommendation page, activation page and management pages.
- [Marek Kurańda](https://github.com/mjkuranda): `dvh` unit.
- [Marek Kurańda](https://github.com/mjkuranda): `hd` and `full-hd` type resolutions.

### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Editing the dishes, adding `DishEditorContainer`.

## [2.2.1] - 2025-02-27
### Added
- [Marek Kurańda](https://github.com/mjkuranda): GitHub workflow for CI checks after squash merge as `ci-checks-master`.

### Changed
- [Marek Kurańda](https://github.com/mjkuranda): GitHub workflow for CI checks after raising a PR to `ci-checks-pr`.

## [2.2.0] - 2025-02-27
### Added
- [Marek Kurańda](https://github.com/mjkuranda): GitHub workflow for CI checks: install dependencies, lint and build.
- [Marek Kurańda](https://github.com/mjkuranda): `FetchObjectFunction` to fix lint problem causing mistaken read code as a JSX.

## [2.1.0] - 2025-02-27
### Added
- [Marek Kurańda](https://github.com/mjkuranda): API helper containing `apiCall` function.

### Changed
- [Marek Kurańda](https://github.com/mjkuranda): API URL with the prefix and version.

## [2.0.1] - 2025-02-25
### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Build due to variables in `dish-creator-form.module`.

## [2.0.0] - 2025-02-25
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `PageLink`, `TopHeader` and `ProgressBar` components.
- [Marek Kurańda](https://github.com/mjkuranda): Containers for some forms.
- [Marek Kurańda](https://github.com/mjkuranda): New files for constants.
- [Marek Kurańda](https://github.com/mjkuranda): Icons to `InputSelect` component.
- [Marek Kurańda](https://github.com/mjkuranda): Funny texts related to current period of the meal along with progress bar and time constraints at search page.
- [Marek Kurańda](https://github.com/mjkuranda): `hasMarginAround` data property to `BackLinkBar` component to define a margin or not.
- [Marek Kurańda](https://github.com/mjkuranda): `DishCreatorContainer` for containing all logics for proceeding dish creator data.
- [Marek Kurańda](https://github.com/mjkuranda): `Checkbox` component.
- [Marek Kurańda](https://github.com/mjkuranda): New `DishMatcher` icon.
- [Marek Kurańda](https://github.com/mjkuranda): Partial SCSS files: `functions`, `typographies` and `variables`.

### Changed
- [Marek Kurańda](https://github.com/mjkuranda): Colour palette.
- [Marek Kurańda](https://github.com/mjkuranda): Buttons design.
- [Marek Kurańda](https://github.com/mjkuranda): Landing page, search page, login page, registration page, recommendation page, dish details page, header and footer design.
- [Marek Kurańda](https://github.com/mjkuranda): Independent `SearchForm` and `SearchContainer` to have logics separately.
- [Marek Kurańda](https://github.com/mjkuranda): Ingredient and flag information for dish results.
- [Marek Kurańda](https://github.com/mjkuranda): All button components were moved to `src/components/common/buttons`.
- [Marek Kurańda](https://github.com/mjkuranda): All link components were moved to `src/components/common/links`.

### Removed
- [Marek Kurańda](https://github.com/mjkuranda): `global-colors` and `global-constants` SCSS files.
- [Marek Kurańda](https://github.com/mjkuranda): `@import` directives replacing with `@use` ones.

## [1.66.0] - 2025-01-31
### Added
- [Marek Kurańda](https://github.com/mjkuranda): New subpage `/users/:login/profile` for rendering basic user profile info.
- [Marek Kurańda](https://github.com/mjkuranda): Handling `data-type` attribute property with value `multi-content` to `WrappedScreenContentLayout` not to break layout when more than one element was added into component body.
- [Marek Kurańda](https://github.com/mjkuranda): Handling `data-only-margin-bottom` attribute property with value `true` to `BackLinkBar`.
- [Marek Kurańda](https://github.com/mjkuranda): First buildable version of the application.
- [Marek Kurańda](https://github.com/mjkuranda): Links to the users and dishes at management page.

### Changed
- [Marek Kurańda](https://github.com/mjkuranda): Page code layout for 404 pages. 

## [1.65.0] - 2025-01-30
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `ScreenContentLayout`, `WrappedContentLayout` and `WrappedScreenContentLayout` layouts.

## [1.64.0] - 2025-01-30
### Changed
- [Marek Kurańda](https://github.com/mjkuranda): `/dish-proposal` to `/recommendations`.
- [Marek Kurańda](https://github.com/mjkuranda): `/result` to `/dishes/:id`.
- [Marek Kurańda](https://github.com/mjkuranda): `/dishes/create/:id` to `/dishes/:id/edit`.
- [Marek Kurańda](https://github.com/mjkuranda): `/users/registration?action=reset` to `/users/change-password`.
- [Marek Kurańda](https://github.com/mjkuranda): Ingredient icon to default one when image hasn't found.
- [Marek Kurańda](https://github.com/mjkuranda): Login, register and activation screen layout.

### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Matched ingredients.

## [1.63.0] - 2025-01-30
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `FlagIcon` component.

### Changed
- [Marek Kurańda](https://github.com/mjkuranda): Title, description and relevance information texts were centered.
- [Marek Kurańda](https://github.com/mjkuranda): Dish result title shortened to 2 lines.

## [1.62.1] - 2025-01-30
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Result bar below result at search page.
- [Marek Kurańda](https://github.com/mjkuranda): Rounded borders for search results.

### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Filtering dishes by meal and dish types.

## [1.62.0] - 2025-01-29
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Optional property `width` to `button` component.
- [Marek Kurańda](https://github.com/mjkuranda): `BarLinkBar` component.

### Changed
- [Marek Kurańda](https://github.com/mjkuranda): Browsing recommendation up to 3 proposals with new layout.

## [1.61.1] - 2025-01-29
### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Errors for dish searching and details.

### Removed
- [Marek Kurańda](https://github.com/mjkuranda): `/about` page.

## [1.61.0] - 2024-12-12
### Added
- [Marek Kurańda](https://github.com/mjkuranda): New mode for subpage `/users/register?reset` where you can change your password.

### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Dish `readyForMinutes` time validation.

## [1.60.1] - 2024-12-11
### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): API error handling for time preparation.
- [Marek Kurańda](https://github.com/mjkuranda): Sorting ingredient labels which caused improper ID generation.
- [Marek Kurańda](https://github.com/mjkuranda): Searching dishes providing types.

## [1.60.0] - 2024-11-27
### Added
- [Marek Kurańda](https://github.com/mjkuranda): New subpage `/about` where put information about the author.

## [1.59.0] - 2024-11-19
### Added
- [Marek Kurańda](https://github.com/mjkuranda): New subpages for admin: `Permission for adding`, `Permission for editing` and `Permission for deleting`.
- [Marek Kurańda](https://github.com/mjkuranda): Capability for admins to grand or deny permissions all users which are not admins.
- [Marek Kurańda](https://github.com/mjkuranda): Pagination for tables at `/manage` page.

## [1.58.1] - 2024-11-19
### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): You can access management page when you log in and try to enter manage page.

## [1.58.0] - 2024-11-18
### Added
- [Marek Kurańda](https://github.com/mjkuranda): A new ingredient category - `cereal-products`.
- [Marek Kurańda](https://github.com/mjkuranda): Images for all ingredients in categories and at `search` page.
- [Marek Kurańda](https://github.com/mjkuranda): `pantry` ingredients.

### Changed
- [Marek Kurańda](https://github.com/mjkuranda): Ingredient lists and translation for `Fold/unfold`.
- [Marek Kurańda](https://github.com/mjkuranda): `Next.js` version to `14.2.10`.
- [Marek Kurańda](https://github.com/mjkuranda): List of ingredients at `dish creation` page.

## [1.57.0] - 2024-10-22
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Smooth screen scrolling at landing page using `ArrowUp` and `ArrowDown` keys.

### Changed
- [Marek Kurańda](https://github.com/mjkuranda): `Co na dziś?` to `DishMatcher`.

## [1.56.0] - 2024-10-21
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Semi-transparent black overlay to landing page screens.
- [Marek Kurańda](https://github.com/mjkuranda): Icons for buttons: `log in`, `log out`, `manage`, `search`, `best search`, `clear`, `previous`, `next` and `details`.
- [Marek Kurańda](https://github.com/mjkuranda): Smooth screen scrolling at landing page.

### Changed
- [Marek Kurańda](https://github.com/mjkuranda): `Yummy` to `Co na dziś?`.

## [1.55.0] - 2024-10-21
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Activation page at `/users/activate/[activationCode]`.
- [Marek Kurańda](https://github.com/mjkuranda): Confirmation modal for all objects at manage page.
- [Marek Kurańda](https://github.com/mjkuranda): Object count at every object manage page.

## [1.54.3] - 2024-10-21
### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Loading dish images.

## [1.54.2] - 2024-10-16
### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Inferring search meal type, based on the current time.

## [1.54.1] - 2024-10-16
### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Dish edition icon is only shown when you are an admin or an author of the dish.

## [1.54.0] - 2024-10-15
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Capability to delete dishes.
- [Marek Kurańda](https://github.com/mjkuranda): `DELETE` endpoint handling method.

## [1.53.1] - 2024-10-14
### Changed
- [Marek Kurańda](https://github.com/mjkuranda): Refetching object list after confirming action at `/manage`.

## [1.53.0] - 2024-10-14
### Changed
- [Marek Kurańda](https://github.com/mjkuranda): User management styles and language.

## [1.52.3] - 2024-10-14
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `Dessert` and `beverage` integration.

## [1.52.2] - 2024-10-11
### Changed
- [Marek Kurańda](https://github.com/mjkuranda): Dish creator translations.

## [1.51.1] - 2024-10-11
### Changed
- [Marek Kurańda](https://github.com/mjkuranda): User register form constraints.

## [1.51.0] - 2024-10-09
### Changed
- [Marek Kurańda](https://github.com/mjkuranda): `Meal` to `Dish`.

### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Invisible `Manage` text button after first logging in.

## [1.50.0] - 2024-10-01
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Meal and dish type filtering.
- [Marek Kurańda](https://github.com/mjkuranda): Defining dish type while creating.

## [1.49.1] - 2024-09-28
### Changed
- [Marek Kurańda](https://github.com/mjkuranda): All checked ingredients are unchecking when you clear search form.

### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Empty type select when `type` is undefined.

## [1.49.0] - 2024-09-28
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Capability to clear all filters at `/search`.

## [1.48.0] - 2024-09-28
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Meal type filtering (default is `any` meal).

### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Sending meal proposal when you are logged in only.

## [1.47.3] - 2024-09-23
### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Error when you tried to get meal details that was not confirmed by admin.

## [1.47.2] - 2024-09-23
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Extra info about provider when comes from Spoonacular.
- [Marek Kurańda](https://github.com/mjkuranda): Toast when you log out.

### Changed
- [Marek Kurańda](https://github.com/mjkuranda): Translated login and register account page.
- [Marek Kurańda](https://github.com/mjkuranda): Global language of the page to Polish.

## [1.47.1] - 2024-09-18
### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Null value from local storage when you enter first time at the page.

## [1.47.0] - 2024-09-17
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Translated description and recipe of meal at result page.
- [Marek Kurańda](https://github.com/mjkuranda): UK flag indicating that meal was translated into Polish.
- [Marek Kurańda](https://github.com/mjkuranda): `tick` and `wrong` icons when an ingredient matches with your query or not.

### Changed
- [Marek Kurańda](https://github.com/mjkuranda): Ingredients are rendered between meal description and recipe.

## [1.46.1] - 2024-09-17
### Changed
- [Marek Kurańda](https://github.com/mjkuranda): React Strict Mode to `false` as default to prevent double renders the components on the first time.
- [Marek Kurańda](https://github.com/mjkuranda): `/management` page to `/manage` page.
- [Marek Kurańda](https://github.com/mjkuranda): Refreshing token every 5 minutes.

### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): User saving information in user context.
- [Marek Kurańda](https://github.com/mjkuranda): Redirecting at `/management/[objects]/[action]` when you don't have any required capability.
- [Marek Kurańda](https://github.com/mjkuranda): Link to `/manage` is not visible for users who have no capabilities.

## [1.46.0] - 2024-09-16
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Mushroom ingredient set as category.
- [Marek Kurańda](https://github.com/mjkuranda): Scrolling at search page when results are received.
- [Marek Kurańda](https://github.com/mjkuranda): Information about missing ingredients.

### Changed
- [Marek Kurańda](https://github.com/mjkuranda): Simplified and sorted ingredient set at search page.
- [Marek Kurańda](https://github.com/mjkuranda): No message about result when query is null at search page.

## [1.45.0] - 2024-09-16
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Images for landing page.

## [1.44.0] - 2024-08-31
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Capability to define and edit a time preparation for meal.
- [Marek Kurańda](https://github.com/mjkuranda): Capability to edit a meal through author itself.

## [1.43.3]
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Refreshing access token every 1 minute.

### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): User context fetching a current user information.
- [Marek Kurańda](https://github.com/mjkuranda): Meal rating stars count.

## [1.43.2] - 2024-08-30
### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Loading meal details from Yummy local database.

## [1.43.1] - 2024-08-30
### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Fetching ingredients at meal creator.
- [Marek Kurańda](https://github.com/mjkuranda): Resetting meal form after creation.

## [1.43.0] - 2024-08-29
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Meal editing page.

## [1.42.1] - 2024-08-29
### Fixed
- [Marek Kurańda](https://github.com/mjkuranda): Error handling for meal creation.

## [1.42.0] - 2024-08-29
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Unit and amount of ingredient at create page.

## [1.41.0] - 2024-08-28
### Added
- [Marek Kurańda](https://github.com/mjkuranda): information about overall meal time preparation at result page.

## [1.40.0] - 2024-08-28
### Added
- [Marek Kurańda](https://github.com/mjkuranda): `provider` as a property to meal types.

## [1.39.0] - 2024-08-28
### Added
- [Marek Kurańda](https://github.com/mjkuranda): Capability to add and display ratings for the meals.
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
