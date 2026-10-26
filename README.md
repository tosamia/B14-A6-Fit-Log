
# FitLog – Workout Library & Fitness Planner

FitLog is a responsive fitness web application that helps users
explore workouts, view exercise details, create a daily workout
plan, and save exercises for later.

The application is built using Next.js, TypeScript, and Tailwind CSS.

## Live Website

https://fitlog-coral-nu.vercel.app/

## GitHub Repository

https://github.com/tosamia/B14-A6-Fit-Log

## Features

- Browse a library of workouts fetched from an API.
- View detailed information about each workout.
- Sort workouts by duration, calories burned, and rating.
- Add up to 5 exercises to today's workout plan.
- Save favorite workouts for later.
- Mark planned workouts as completed.
- Remove workouts from the plan or saved list.
- View total exercises, minutes, and calories in My Plan.
- Store workout plans and saved exercises using localStorage.
- Show toast notifications for user actions.
- Display a custom 404 page for invalid routes.
- Responsive design for mobile, tablet, and desktop.

## Technologies Used

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Lucide React
- React Toastify
- Local Storage
- REST API

## Pages

### Home Page

The Home page contains a workout library where users can
browse exercises and sort them by different criteria.

### Workout Details Page

Each workout has a separate dynamic details page.

Users can view:

- Workout name and description
- Equipment
- Difficulty
- Sets and repetitions
- Duration
- Calories burned
- Rating
- Muscle groups
- Exercise instructions

Users can also add workouts to their daily plan or
save them for later.

### My Plan Page

The My Plan page has two tabs:

**Today's Plan**
- Shows workouts added to the daily plan.
- Allows a maximum of 5 workouts.
- Displays total minutes and calories.
- Allows users to mark workouts as done.
- Allows users to remove workouts.

**Saved**
- Displays workouts saved for later.
- Allows users to view details or remove saved workouts.

## API

Workout data is fetched from:

https://api.abcz.workers.dev/api/fitlog

Backup API:

https://api.api-store.workers.dev/api/fitlog

## Run Locally

1. Clone the repository:

   git clone https://github.com/tosamia/B14-A6-Fit-Log.git

2. Open the application folder:

   cd B14-A6-Fit-Log/fitlog

3. Install dependencies:

   npm install

4. Start the development server:

   npm run dev

5. Open the website:

   http://localhost:3000

## Production Build

To create a production build:

   npm run build

## Future Improvements

- User authentication
- Personalized fitness goals
- Workout progress charts
- Weekly workout schedules
- Exercise search and filtering

## Author

GitHub: https://github.com/tosamia

---

Built with Next.js, TypeScript, and Tailwind CSS.
