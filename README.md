# NutriScan - Food Intelligence & Wellness App

NutriScan is an AI-powered food tracking application designed to help users monitor their daily nutrition intake, detect junk foods, and promote healthy eating habits through antioxidant-rich food recommendations.

## Features

### 🏠 Dashboard
- **Daily Calorie Counter** - Track total calories consumed
- **Antioxidant Score** - Monitor antioxidant intake (higher is better)
- **Junk Score** - Detect harmful ingredients and additives
- **Fiber Tracker** - Visual progress toward daily fiber goals
- **Health Status** - Overall wellness rating based on eating patterns
- **Meal History** - Time-stamped log of all meals

### 📱 Scan Food
- Browse 15+ common foods from different categories
- Instant nutritional data lookup
- Junk food alerts for high-processed items
- One-tap logging with automatic calorie calculation

### 💡 Smart Recommendations
- Personalized suggestions based on your eating patterns
- Tips to boost antioxidants, reduce junk, increase fiber
- Healthy food alternatives
- Contextual wellness guidance

### 📋 Food Journal
- Complete meal log with timestamps
- Nutritional breakdown per meal
- Daily, weekly summaries
- Clear filters and organization

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project:**
   ```bash
   git clone <repository-url>
   cd nutriscan
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   The app will automatically open at `http://localhost:3000`

### Project Structure

```
nutriscan/
├── public/
│   └── index.html
├── src/
│   ├── NutriScan.jsx       # Main app component
│   ├── App.js              # App wrapper
│   ├── App.css             # Global styles
│   ├── index.js            # React entry point
│   └── index.css           # Base styles
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Usage

### Adding Meals
1. Click on **"Scan food"** tab
2. Select food from the list
3. Food automatically logs with nutritional data
4. Junk food alerts trigger for unhealthy items

### Viewing Dashboard
- See today's totals (calories, antioxidants, junk score)
- Monitor fiber intake with progress bar
- Get overall health status rating
- View all meals logged today

### Getting Recommendations
- Click **"Suggestions"** tab
- Receive personalized tips based on your eating patterns
- Get specific recommendations for improving scores

### Checking Journal
- View complete food history with timestamps
- See nutritional breakdown per meal
- Review daily/weekly summaries

## Nutritional Database

The app includes 15 pre-loaded foods across categories:

**Fruits:** Apple, Blueberries, Orange juice
**Vegetables:** Spinach salad, Broccoli, Carrot
**Proteins:** Grilled chicken, Salmon
**Grains:** White bread, Whole grain rice
**Snacks:** Dark chocolate, Almonds
**Junk Foods:** French fries, Soda

Each food has:
- Calories
- Antioxidant score (0-100)
- Junk score (0-100)
- Fiber content (g)

## Scoring System

### Antioxidant Score
- **0-30:** Needs improvement
- **30-50:** Fair
- **50-70:** Good
- **70+:** Excellent

Higher scores indicate more antioxidant-rich foods (berries, greens, dark chocolate, legumes).

### Junk Score
- **0-20:** Healthy
- **20-60:** Ok
- **60+:** High junk (high trans fats, additives, oxidizing agents)

### Daily Goals
- **Calories:** 2000
- **Fiber:** 25g
- **Antioxidant Avg:** 70+

## Technologies Used

- **React 18** - UI framework
- **JavaScript ES6+** - Programming language
- **CSS3** - Styling
- **React Hooks** - State management (useState)

## Future Enhancements

### Phase 2 - MVP Features
- [ ] Camera integration for food recognition
- [ ] Real nutrition database API (USDA FoodData Central)
- [ ] OCR for nutrition label scanning
- [ ] Push notifications for healthy reminders
- [ ] Weekly email digests

### Phase 3 - Advanced
- [ ] AR portion sizing estimation
- [ ] Barcode scanning
- [ ] Social sharing (streaks, achievements)
- [ ] Dietitian integration
- [ ] AI meal planning
- [ ] Local food database (Indian cuisine focus)

### Phase 4 - Monetization
- [ ] Pro subscription features
- [ ] Premium recipe library
- [ ] Advanced analytics
- [ ] Integration with fitness trackers

## API Integration Guide

### Adding USDA FoodData Central
```javascript
// Replace foodDatabase with API call
const fetchFoodData = async (foodName) => {
  const response = await fetch(
    `https://fdc.nal.usda.gov/api/foods/search?query=${foodName}&pageSize=10&api_key=YOUR_API_KEY`
  );
  const data = await response.json();
  return data.foods;
};
```

### Adding Google Vision API
```javascript
// For food image recognition
import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient();
const request = {
  image: { content: base64Image },
};
const [result] = await client.labelDetection(request);
```

### Firebase Push Notifications
```javascript
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';

const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received:', payload);
});
```

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Troubleshooting

**App won't start:**
- Clear node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Clear npm cache: `npm cache clean --force`

**Styles not loading:**
- Restart dev server: `npm start`
- Check browser cache
- Open dev tools and verify CSS is loaded

**React errors:**
- Check React version compatibility
- Ensure all imports are correct
- Clear browser console for error details

## License

MIT License - Free to use and modify

## Contributing

Contributions are welcome! Areas for help:
- Adding more foods to database
- Improving antioxidant/junk scoring accuracy
- UI/UX improvements
- Additional features
- Bug fixes

## Support

For issues or questions:
- Open an GitHub issue
- Email: support@nutriscan.app

---

**Happy tracking! 🥗🍎💚**
