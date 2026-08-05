# Habitus - Lifestyle Pattern Wellness Application

Habitus helps users understand their basic wellness patterns and gives quick, personalized daily recommendations—without requiring long forms, tracking devices, or complicated analytics.

## Features

1. **User Authentication**
   - Sign up with email and password
   - Secure login system
   - Session management

2. **Quick Personal Wellness Profile**
   - Name, age, gender, profession
   - Physical health conditions selection
   - Mental wellness conditions selection
   - Daily habits tracking (sleep, hydration, energy)

3. **Wellness Dashboard**
   - Clean, minimal cards displaying:
     - Sleep hours
     - Hydration level
     - Energy level
   - Personalized daily recommendations based on user input

4. **Personalized Recommendations**
   - Immunity tips
   - Stress management ideas
   - Sleep improvement techniques
   - Hydration goals
   - Energy boost suggestions

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd HabitusLifestylePattern
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Application Flow

1. **Login/Signup** - Users create an account or log in
2. **Profile Creation** - Enter basic information (name, age, gender, profession)
3. **Physical Health** - Select health conditions (multiple selection allowed)
4. **Mental Wellness** - Select wellness conditions (multiple selection allowed)
5. **Daily Habits** - Enter sleep hours, water intake, and energy level
6. **Dashboard** - View wellness metrics and personalized recommendations

## Technology Stack

- React 18.2.0
- React Router DOM 6.20.0
- LocalStorage for data persistence
- Modern CSS with gradients and animations

## Data Storage

The application uses browser LocalStorage to store:
- User credentials
- User profile data
- Physical health conditions
- Mental wellness conditions
- Daily habits metrics

## Features in Detail

### Dashboard Recommendations

The application generates personalized recommendations based on:
- Water intake levels (suggests goals if low)
- Sleep duration (provides improvement tips)
- Energy levels (suggests boosters)
- Physical health conditions (immunity tips)
- Mental wellness conditions (stress management, sleep improvement)

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## License

This project is private and proprietary.





