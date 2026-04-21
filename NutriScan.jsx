import React, { useState } from 'react';

export default function NutriScan() {
  const [screen, setScreen] = useState('home');
  const [meals, setMeals] = useState([
    { name: 'Oatmeal with berries', calories: 280, antioxidants: 85, junk: 5, time: '8:00 AM', fiber: 4.4 }
  ]);
  const [alerts, setAlerts] = useState([]);

  const foodDatabase = [
    { name: 'Apple', calories: 95, antioxidants: 75, junk: 2, fiber: 4.4, category: 'Fruit' },
    { name: 'Spinach salad', calories: 45, antioxidants: 92, junk: 3, fiber: 2.7, category: 'Vegetable' },
    { name: 'Grilled chicken breast', calories: 185, antioxidants: 15, junk: 5, fiber: 0, category: 'Protein' },
    { name: 'White bread', calories: 80, antioxidants: 8, junk: 35, fiber: 1.4, category: 'Grain' },
    { name: 'Dark chocolate 70%', calories: 155, antioxidants: 88, junk: 15, fiber: 3.1, category: 'Snack' },
    { name: 'Soda (355ml)', calories: 140, antioxidants: 0, junk: 92, fiber: 0, category: 'Beverage' },
    { name: 'Blueberries', calories: 57, antioxidants: 95, junk: 0, fiber: 3.6, category: 'Fruit' },
    { name: 'Broccoli', calories: 34, antioxidants: 85, junk: 2, fiber: 2.4, category: 'Vegetable' },
    { name: 'Whole grain rice', calories: 206, antioxidants: 25, junk: 5, fiber: 3.5, category: 'Grain' },
    { name: 'French fries', calories: 320, antioxidants: 8, junk: 78, fiber: 2.7, category: 'Junk' },
    { name: 'Orange juice', calories: 110, antioxidants: 65, junk: 25, fiber: 0.5, category: 'Beverage' },
    { name: 'Yogurt', calories: 100, antioxidants: 20, junk: 10, fiber: 0, category: 'Dairy' },
    { name: 'Almonds (28g)', calories: 164, antioxidants: 35, junk: 5, fiber: 3.5, category: 'Snack' },
    { name: 'Salmon (100g)', calories: 206, antioxidants: 45, junk: 5, fiber: 0, category: 'Protein' },
    { name: 'Carrot', calories: 25, antioxidants: 70, junk: 2, fiber: 1.7, category: 'Vegetable' }
  ];

  // Calculate daily totals
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalAntioxidants = meals.reduce((sum, m) => sum + m.antioxidants, 0);
  const totalJunk = meals.reduce((sum, m) => sum + m.junk, 0);
  const totalFiber = meals.reduce((sum, m) => sum + (m.fiber || 0), 0);
  const avgAntioxidants = meals.length > 0 ? Math.round(totalAntioxidants / meals.length) : 0;

  // Handle adding food
  const handleAddFood = (food) => {
    const newMeal = {
      ...food,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMeals([...meals, newMeal]);

    // Show alert for junk food
    if (food.junk > 60) {
      const alertMsg = `⚠️ High junk score detected in "${food.name}" (${food.junk}/100). Consider a healthier alternative!`;
      setAlerts([alertMsg, ...alerts]);
      setTimeout(() => setAlerts(prev => prev.slice(0, -1)), 5000);
    }
  };

  // Determine health status
  const healthStatus = avgAntioxidants >= 70 ? 'Excellent' : avgAntioxidants >= 50 ? 'Good' : avgAntioxidants >= 30 ? 'Fair' : 'Needs improvement';
  const statusColor = avgAntioxidants >= 70 ? '#1D9E75' : avgAntioxidants >= 50 ? '#639922' : avgAntioxidants >= 30 ? '#BA7517' : '#E24B4A';

  // Clear all meals
  const handleClearMeals = () => {
    setMeals([]);
  };

  return (
    <div style={styles.container}>
      <style>{cssStyles}</style>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.appTitle}>NutriScan</h1>
        <p style={styles.appSubtitle}>Your food intelligence companion</p>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && alerts.map((alert, i) => (
        <div key={i} style={styles.alertBox}>{alert}</div>
      ))}

      {/* Navigation Tabs */}
      <div style={styles.navTabs}>
        <button 
          style={{...styles.navTab, ...(screen === 'home' ? styles.navTabActive : {})}}
          onClick={() => setScreen('home')}
        >
          Dashboard
        </button>
        <button 
          style={{...styles.navTab, ...(screen === 'scan' ? styles.navTabActive : {})}}
          onClick={() => setScreen('scan')}
        >
          Scan food
        </button>
        <button 
          style={{...styles.navTab, ...(screen === 'recommend' ? styles.navTabActive : {})}}
          onClick={() => setScreen('recommend')}
        >
          Suggestions
        </button>
        <button 
          style={{...styles.navTab, ...(screen === 'journal' ? styles.navTabActive : {})}}
          onClick={() => setScreen('journal')}
        >
          Journal
        </button>
      </div>

      {/* Home Screen */}
      {screen === 'home' && (
        <div>
          {/* Stats Grid */}
          <div style={styles.dashboardGrid}>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Today's calories</div>
              <div style={styles.statValue}>{Math.round(totalCalories)}</div>
              <div style={styles.statGoal}>Goal: 2000</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Meals logged</div>
              <div style={styles.statValue}>{meals.length}</div>
              <div style={styles.statGoal}>Today</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Junk score</div>
              <div style={{...styles.statValue, color: totalJunk > 50 ? '#E24B4A' : '#1D9E75'}}>{Math.round(totalJunk)}</div>
              <div style={styles.statGoal}>Lower is better</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Antioxidant score</div>
              <div style={{...styles.statValue, color: '#1D9E75'}}>{avgAntioxidants}</div>
              <div style={styles.statGoal}>{healthStatus}</div>
            </div>
          </div>

          {/* Health Rating */}
          <div style={styles.healthCard}>
            <div style={styles.healthLabel}>Overall health rating</div>
            <div style={{...styles.scoreRing, borderColor: statusColor, background: `${statusColor}15`}}>
              <div style={{...styles.scoreRingText, color: statusColor}}>{healthStatus}</div>
            </div>
            <p style={styles.healthMessage}>
              Keep pushing for more antioxidant-rich foods like berries, greens, and legumes.
            </p>
          </div>

          {/* Fiber Tracker */}
          <div style={styles.fiberCard}>
            <div style={styles.fiberHeader}>
              <span style={styles.fiberLabel}>Fiber intake</span>
              <span style={styles.fiberValue}>{totalFiber.toFixed(1)}g / 25g</span>
            </div>
            <div style={styles.progressBar}>
              <div style={{...styles.progressFill, width: `${Math.min((totalFiber / 25) * 100, 100)}%`}}></div>
            </div>
          </div>

          {/* Meals List */}
          {meals.length > 0 && (
            <div style={{marginTop: '1.5rem'}}>
              <div style={styles.sectionHeader}>
                <h3 style={styles.sectionTitle}>Today's meals</h3>
                <button style={styles.clearBtn} onClick={handleClearMeals}>Clear</button>
              </div>
              {meals.map((meal, idx) => (
                <div key={idx} style={styles.mealCard}>
                  <div style={styles.mealHeader}>
                    <div style={styles.mealName}>{meal.name}</div>
                    <div style={styles.mealTime}>{meal.time}</div>
                  </div>
                  <div style={styles.mealStats}>
                    <div style={styles.statItem}><span style={{fontWeight: 500}}>{Math.round(meal.calories)}</span> cal</div>
                    <div style={styles.statItem}><span style={{fontWeight: 500}}>{Math.round(meal.antioxidants)}</span> antioxidants</div>
                    <div style={styles.statItem}><span style={{fontWeight: 500}}>{Math.round(meal.junk)}</span> junk</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Scan Food Screen */}
      {screen === 'scan' && (
        <div>
          <h2 style={styles.screenTitle}>What did you eat?</h2>
          <p style={styles.screenDesc}>Select from common foods or use camera scanning</p>
          <div style={styles.foodGrid}>
            {foodDatabase.map((food, idx) => (
              <button 
                key={idx} 
                style={styles.foodBtn}
                onClick={() => handleAddFood(food)}
              >
                <div style={styles.foodName}>{food.name}</div>
                <div style={styles.foodCal}>{Math.round(food.calories)} cal</div>
                <div style={{
                  ...styles.foodBadge,
                  background: food.antioxidants > 70 ? '#E1F5EE' : food.junk > 60 ? '#FAECE7' : '#F1EFE8',
                  color: food.antioxidants > 70 ? '#0F6E56' : food.junk > 60 ? '#993C1D' : '#5F5E5A'
                }}>
                  {food.antioxidants > 70 ? 'Healthy' : food.junk > 60 ? 'High junk' : 'Ok'}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations Screen */}
      {screen === 'recommend' && (
        <div>
          <h2 style={styles.screenTitle}>Personalized suggestions</h2>
          <p style={styles.screenDesc}>Based on your eating patterns, here's what you should add more of:</p>
          
          {avgAntioxidants < 50 && (
            <div style={styles.recommendationCard}>
              <div style={styles.recIcon}>🫐</div>
              <div style={styles.recTitle}>Boost antioxidants</div>
              <div style={styles.recText}>Your antioxidant score is low. Add berries, leafy greens, or dark chocolate to your next meal.</div>
            </div>
          )}
          
          {meals.some(m => m.junk > 60) && (
            <div style={styles.recommendationCard}>
              <div style={styles.recIcon}>🚫</div>
              <div style={styles.recTitle}>Reduce junk intake</div>
              <div style={styles.recText}>We detected high-junk foods in your logs. Try swapping fried items for grilled options.</div>
            </div>
          )}

          {totalFiber < 20 && (
            <div style={styles.recommendationCard}>
              <div style={styles.recIcon}>🥦</div>
              <div style={styles.recTitle}>Increase fiber</div>
              <div style={styles.recText}>You're below the daily fiber target. Add more vegetables, whole grains, and legumes.</div>
            </div>
          )}

          <div style={styles.recommendationCard}>
            <div style={styles.recIcon}>🥗</div>
            <div style={styles.recTitle}>Make a green salad</div>
            <div style={styles.recText}>Spinach + blueberries + dark chocolate = antioxidant powerhouse. 92 antioxidant score!</div>
          </div>

          <div style={styles.recommendationCard}>
            <div style={styles.recIcon}>🍊</div>
            <div style={styles.recTitle}>Citrus for vitamin C</div>
            <div style={styles.recText}>Oranges and lemons boost immunity and antioxidant content. Try orange juice or fresh citrus.</div>
          </div>
        </div>
      )}

      {/* Food Journal Screen */}
      {screen === 'journal' && (
        <div>
          <h2 style={styles.screenTitle}>Food journal</h2>
          <p style={styles.screenDesc}>Complete log of everything you've eaten today</p>
          
          {meals.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📋</div>
              <p style={styles.emptyText}>No meals logged yet. Start scanning food to build your journal.</p>
            </div>
          ) : (
            <div>
              <div style={styles.journalSummary}>
                <div style={styles.summaryItem}>
                  <span style={styles.summaryLabel}>Total calories</span>
                  <span style={styles.summaryValue}>{Math.round(totalCalories)}</span>
                </div>
                <div style={styles.summaryItem}>
                  <span style={styles.summaryLabel}>Total fiber</span>
                  <span style={styles.summaryValue}>{totalFiber.toFixed(1)}g</span>
                </div>
                <div style={styles.summaryItem}>
                  <span style={styles.summaryLabel}>Avg antioxidants</span>
                  <span style={styles.summaryValue}>{avgAntioxidants}</span>
                </div>
              </div>

              <div style={{marginTop: '1.5rem'}}>
                {meals.map((meal, idx) => (
                  <div key={idx} style={styles.journalEntry}>
                    <div style={styles.journalTime}>{meal.time}</div>
                    <div style={styles.journalContent}>
                      <div style={styles.journalName}>{meal.name}</div>
                      <div style={styles.journalMetas}>
                        <span style={styles.journalMeta}>{meal.calories}cal</span>
                        <span style={styles.journalMeta}>Antioxidants: {meal.antioxidants}</span>
                        <span style={styles.journalMeta}>Junk: {meal.junk}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Styles object
const styles = {
  container: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: 'transparent',
    maxWidth: '700px',
    padding: '0',
  },
  header: {
    paddingBottom: '1.5rem',
  },
  appTitle: {
    fontSize: '28px',
    fontWeight: '600',
    margin: '0 0 0.5rem',
    color: '#1D9E75',
  },
  appSubtitle: {
    fontSize: '14px',
    color: '#888780',
    margin: 0,
  },
  navTabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '1.5rem',
    borderBottom: '1px solid #D3D1C7',
    flexWrap: 'wrap',
  },
  navTab: {
    padding: '10px 14px',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    color: '#888780',
    borderBottom: '2px solid transparent',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  navTabActive: {
    color: '#1a1a1a',
    borderBottomColor: '#1D9E75',
  },
  alertBox: {
    background: '#FCEBEB',
    border: '0.5px solid #F7C1C1',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    color: '#A32D2D',
    fontSize: '14px',
  },
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '1.5rem',
  },
  statCard: {
    background: '#F1EFE8',
    padding: '1rem',
    borderRadius: '8px',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: '12px',
    color: '#888780',
    marginBottom: '6px',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  statGoal: {
    fontSize: '11px',
    color: '#B4B2A9',
    marginTop: '4px',
  },
  healthCard: {
    background: '#ffffff',
    border: '0.5px solid #D3D1C7',
    borderRadius: '12px',
    padding: '1.5rem',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  healthLabel: {
    fontSize: '12px',
    color: '#888780',
    marginBottom: '12px',
  },
  scoreRing: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px',
    borderWidth: '3px',
    borderStyle: 'solid',
  },
  scoreRingText: {
    fontSize: '20px',
    fontWeight: '600',
  },
  healthMessage: {
    fontSize: '13px',
    color: '#888780',
    margin: 0,
  },
  fiberCard: {
    background: '#ffffff',
    border: '0.5px solid #D3D1C7',
    borderRadius: '12px',
    padding: '1rem',
    marginBottom: '1.5rem',
  },
  fiberHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  fiberLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1a1a1a',
  },
  fiberValue: {
    fontSize: '14px',
    color: '#1D9E75',
    fontWeight: '600',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    background: '#E1F5EE',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: '#1D9E75',
    borderRadius: '10px',
    transition: 'width 0.3s ease',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: 0,
  },
  clearBtn: {
    fontSize: '12px',
    padding: '4px 10px',
    border: '0.5px solid #D3D1C7',
    borderRadius: '6px',
    background: '#ffffff',
    cursor: 'pointer',
    color: '#888780',
    transition: 'all 0.2s',
  },
  mealCard: {
    background: '#ffffff',
    border: '0.5px solid #D3D1C7',
    borderRadius: '12px',
    padding: '1rem',
    marginBottom: '10px',
  },
  mealHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  mealName: {
    fontWeight: '600',
    color: '#1a1a1a',
  },
  mealTime: {
    fontSize: '12px',
    color: '#888780',
  },
  mealStats: {
    display: 'flex',
    gap: '16px',
    fontSize: '13px',
  },
  statItem: {
    color: '#888780',
  },
  screenTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#1a1a1a',
  },
  screenDesc: {
    fontSize: '13px',
    color: '#888780',
    marginBottom: '1rem',
  },
  foodGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
  },
  foodBtn: {
    background: '#ffffff',
    border: '0.5px solid #D3D1C7',
    borderRadius: '8px',
    padding: '12px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s',
    fontSize: '13px',
  },
  foodName: {
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  foodCal: {
    fontSize: '12px',
    color: '#888780',
  },
  foodBadge: {
    display: 'inline-block',
    fontSize: '10px',
    padding: '2px 6px',
    borderRadius: '10px',
    marginTop: '6px',
  },
  recommendationCard: {
    background: '#E1F5EE',
    border: '0.5px solid #9FE1CB',
    borderRadius: '12px',
    padding: '1rem',
    marginBottom: '10px',
  },
  recIcon: {
    fontSize: '24px',
    marginBottom: '8px',
  },
  recTitle: {
    fontWeight: '600',
    color: '#0F6E56',
    marginBottom: '4px',
  },
  recText: {
    fontSize: '13px',
    color: '#888780',
  },
  emptyState: {
    textAlign: 'center',
    padding: '2rem 0',
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '12px',
  },
  emptyText: {
    fontSize: '14px',
    color: '#888780',
  },
  journalSummary: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginBottom: '1.5rem',
  },
  summaryItem: {
    background: '#F1EFE8',
    padding: '12px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  summaryLabel: {
    display: 'block',
    fontSize: '11px',
    color: '#888780',
    marginBottom: '4px',
  },
  summaryValue: {
    display: 'block',
    fontSize: '18px',
    fontWeight: '600',
    color: '#1D9E75',
  },
  journalEntry: {
    display: 'flex',
    gap: '12px',
    padding: '12px',
    background: '#ffffff',
    border: '0.5px solid #D3D1C7',
    borderRadius: '8px',
    marginBottom: '8px',
  },
  journalTime: {
    fontSize: '12px',
    color: '#888780',
    minWidth: '50px',
    fontWeight: '600',
  },
  journalContent: {
    flex: 1,
  },
  journalName: {
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  journalMetas: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  journalMeta: {
    fontSize: '12px',
    color: '#888780',
  },
};

// CSS Styles string (for any additional styling)
const cssStyles = `
  button {
    font-family: inherit;
  }
  
  button:hover {
    opacity: 0.8;
  }
  
  button:active {
    transform: scale(0.98);
  }
`;
