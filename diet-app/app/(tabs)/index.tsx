import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { FoodItem, BoldText, CircularProgressBar, KPIcard, TitleBarWithPlusBtn } from "../../src/elements";
import { styles } from "../../src/style";
import { calculateProteinDensity } from "../../src/helpers"
import { createFood, listFoods, FoodRow, EatingHistoryRow, listEatingHistory, deleteAllFoodHistory } from "../../src/db/foods";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";

var calories_consumed = 0; 
var daily_calorie_goal = 3000;

var protein_consumed = 0;
var daily_protein_goal = 200;

// type Food = {
//   name: string;
//   calories: number;
//   protein: number;
// }

export default function Index() {
  const [eatingHistory, setEatingHistory] = useState<EatingHistoryRow[]>([]);

  const refresh = () => {
    setEatingHistory(listEatingHistory());
  };

  useFocusEffect(
    useCallback(() => {
      refresh(); // runs every time this screen becomes active again
    }, [refresh])
  );

  useEffect(() => {
    refresh();
  }, []);

  return (
    <View style={styles.container}>
        <View style={styles.viewTitleBar}>
          <BoldText style={{color: "inherit", flex: 1, textAlign: "center", margin: 10}}>Diet App</BoldText>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Pressable onPress={() => {
            deleteAllFoodHistory();
            refresh();
          }}>
            <BoldText>DELETE ALL HISTORY</BoldText>
          </Pressable>
          <View style={styles.data}>
            <View style={{flexDirection: "row", justifyContent: "center"}}>
              <CircularProgressBar
                progress={calories_consumed/daily_calorie_goal*100}
                title="Calories Remaining"
                innerNumber={daily_calorie_goal-calories_consumed}
                tintColor="#4caf50ff"
              />

              <CircularProgressBar
                progress={protein_consumed/daily_protein_goal*100}
                title="Protein Remaining"
                innerNumber={daily_protein_goal-protein_consumed}
                tintColor="#177cffff"
              />
            </View>
          </View>

          <View style={styles.data}>
            <View style={{flexDirection: "row"}}>
              <View style={{flex: 1}}>
                <KPIcard
                title="Current Calories Consumed"
                data={calories_consumed}
              />
              </View>
              <View style={{flex: 1}}>
                <KPIcard
                title="Current Protein Consumed"
                data={protein_consumed}
              />
              
              </View>
              <View style={{flex: 1}}>
                <KPIcard
                  title="Minimum Protein Density Needed"
                  data={calculateProteinDensity(daily_calorie_goal-calories_consumed, daily_protein_goal-protein_consumed)}
              />
              </View>
                
            </View>      
          </View>

            <TitleBarWithPlusBtn
              text="Food Logged Today"
              onPress={() => router.push("/(tabs)/log-item")}
            />
          
         
          {eatingHistory.map((food) => (
            <FoodItem
              name={food.name}
              calories={food.calories}
              protein={food.protein}
              pressable={false}
              key={food.food_uuid}
            />
          ))}        

        </ScrollView>
    </View>
  );
}