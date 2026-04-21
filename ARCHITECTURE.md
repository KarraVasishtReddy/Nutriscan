# NutriScan Architecture & Code Structure

## Overview

NutriScan is a React-based single-page application (SPA) that manages food tracking, nutritional analysis, and wellness recommendations.

## Core Components

### Main Component: `NutriScan.jsx`

The entire app logic lives in one component. Here's the structure:

```
NutriScan
├── State Management (useState hooks)
├── Food Database
├── Screen Navigation (home, scan, recommend, journal)
├── Calculation Functions
└── UI Rendering
```

## State Variables

```javascript
const [screen, setScreen] = useState('home');      // Current active tab
const [meals, setMeals] = useState([...]);         // Array of logged meals
const [alerts, setAlerts] = useState([]);          // Temporary alert messages
```

Each meal object:
```javascript
{
  name: string,
  calories: number,
  antioxidants: number,    // 0-100 score
  junk: number,            // 0-100 score (higher = worse)
  fiber: number,           // grams
  time: string             // HH:MM format
}
```

## Key Functions

### 1. Meal Management

**Add Meal:**
```javascript
const handleAddFood = (food) => {
  const newMeal = { ...food, time: getTime() };
  setMeals([...meals, newMeal]);
  
  // Show alert if junk score > 60
  if (food.junk > 60) {
    showAlert(`Warning: ${food.name} has high junk score`);
  }
};
```

**Clear All Meals:**
```javascript
const handleClearMeals = () => {
  setMeals([]);
};
```

### 2. Calculations

**Daily Totals:**
```javascript
const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
const totalAntioxidants = meals.reduce((sum, m) => sum + m.antioxidants, 0);
const avgAntioxidants = meals.length > 0 ? totalAntioxidants / meals.length : 0;
```

**Health Status:**
```javascript
const healthStatus = 
  avgAntioxidants >= 70 ? 'Excellent' :
  avgAntioxidants >= 50 ? 'Good' :
  avgAntioxidants >= 30 ? 'Fair' :
  'Needs improvement';
```

### 3. Recommendations Logic

Recommendations trigger based on:
- If `avgAntioxidants < 50` → "Boost antioxidants"
- If any meal has `junk > 60` → "Reduce junk intake"
- If `totalFiber < 20` → "Increase fiber"

## Screen Navigation

Four main screens controlled by `screen` state:

### 1. **home** - Dashboard
- Daily stats cards
- Health rating circle
- Fiber progress bar
- Meal history list

### 2. **scan** - Food Selection
- Grid of 15 foods
- One-tap logging
- Nutritional badges (Healthy/Ok/High junk)

### 3. **recommend** - Personalized Tips
- Dynamic recommendations based on current intake
- Contextual health suggestions

### 4. **journal** - Complete Log
- Time-stamped meal list
- Daily summary stats
- Nutritional breakdown

## Styling Approach

All styles are inline using a `styles` object:

```javascript
const styles = {
  container: { ... },
  navTab: { ... },
  statCard: { ... },
  // etc.
};
```

This makes it easy to:
- Modify colors globally
- Understand component styling at a glance
- Port styles to CSS modules later

## Food Database

Located in the component:
```javascript
const foodDatabase = [
  {
    name: 'Apple',
    calories: 95,
    antioxidants: 75,    // 0-100
    junk: 2,             // 0-100
    fiber: 4.4,          // grams
    category: 'Fruit'
  },
  // ... more foods
];
```

## How to Extend

### Add a New Food

1. Add to `foodDatabase`:
```javascript
{
  name: 'Kale salad',
  calories: 66,
  antioxidants: 94,
  junk: 1,
  fiber: 1.3,
  category: 'Vegetable'
}
```

### Add a New Screen

1. Add to navigation tabs:
```javascript
<button onClick={() => setScreen('newscreen')}>New</button>
```

2. Add rendering logic:
```javascript
{screen === 'newscreen' && (
  <div>
    {/* Your content */}
  </div>
)}
```

### Add a New Alert Type

```javascript
// In handleAddFood() or elsewhere:
if (someCondition) {
  setAlerts([alertMessage, ...alerts]);
  setTimeout(() => setAlerts(prev => prev.slice(0, -1)), 5000);
}
```

### Add a New Stat Card

In the dashboard section:
```javascript
<div style={styles.statCard}>
  <div style={styles.statLabel}>Your Label</div>
  <div style={styles.statValue}>{yourValue}</div>
  <div style={styles.statGoal}>Context</div>
</div>
```

## Integration Points

### To Add Camera Scanning

Replace food selection with:
```javascript
import { useRef } from 'react';

const cameraRef = useRef(null);

const handleCapture = async (imageSrc) => {
  const response = await fetch('/api/recognize-food', {
    method: 'POST',
    body: JSON.stringify({ image: imageSrc })
  });
  const foodData = await response.json();
  handleAddFood(foodData);
};
```

### To Add API Integration

Replace foodDatabase with:
```javascript
const [foodDatabase, setFoodDatabase] = useState([]);

useEffect(() => {
  const fetchFoods = async () => {
    const response = await fetch(
      'https://api.usda.gov/foods?api_key=YOUR_KEY'
    );
    const data = await response.json();
    setFoodDatabase(data.foods);
  };
  fetchFoods();
}, []);
```

### To Add Firebase Notifications

```javascript
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';

const messaging = getMessaging();
onMessage(messaging, (payload) => {
  setAlerts([payload.notification.body, ...alerts]);
});
```

### To Add User Profiles

Create a context or state for user data:
```javascript
const [user, setUser] = useState({
  id: 'user123',
  dailyGoal: 2000,
  fiberGoal: 25,
  preferences: { ... }
});
```

## Performance Considerations

1. **Meal Lists** - Currently loads all meals in memory. For 1000+ meals, consider pagination.

2. **Calculations** - All calculations run on render. Use `useMemo` if needed:
```javascript
const totalCalories = useMemo(
  () => meals.reduce((sum, m) => sum + m.calories, 0),
  [meals]
);
```

3. **Rendering** - Consider splitting into sub-components for large features:
```javascript
const Dashboard = ({ meals, stats }) => { ... }
const FoodScanner = ({ onAdd }) => { ... }
const Recommendations = ({ meals }) => { ... }
```

## Testing

Key functions to test:
1. `handleAddFood()` - Check meal logging and alerts
2. Calculations - Verify totals and averages
3. Health status logic - Test thresholds
4. Screen navigation - Test all tab switches

Example test:
```javascript
test('adds meal to list', () => {
  const component = render(<NutriScan />);
  const appleBtn = component.getByText('Apple');
  fireEvent.click(appleBtn);
  expect(component.getByText('Apple')).toBeInTheDocument();
});
```

## Future Refactoring

As the app grows, consider:
1. Split `NutriScan.jsx` into multiple components
2. Move state to Context API or Redux
3. Move styles to CSS modules or styled-components
4. Create custom hooks for calculations
5. Separate business logic from UI

---

**Ready to extend? Start with adding new foods to the database!** 🥗
