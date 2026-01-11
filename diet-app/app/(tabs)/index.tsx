import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { FoodItem, BoldText, CircularProgressBar, KPIcard, TitleBarWithPlusBtn, DataLine } from "../../src/elements";
import { styles } from "../../src/style";
import { calculateProteinDensity } from "../../src/helpers"
import { createFood, listFoods, FoodRow, EatingHistoryRow, listEatingHistory, deleteAllFoodHistory } from "../../src/db/foods";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";

var daily_calorie_goal = 3000;
var daily_protein_goal = 200;

// type Food = {
//   name: string;
//   calories: number;
//   protein: number;
// }

function getFoodLogged(eatingHistory: EatingHistoryRow[]){
  if (eatingHistory.length > 0){
    return (
      <>
        {eatingHistory.map((food) => (
          <FoodItem
            key={food.food_uuid}
            name={food.name}
            calories={food.calories}
            protein={food.protein}
            pressable={false}
          />
        ))}
      </>
    );
  }
  
  return (
    <View style={styles.foodItem}>
      <Text style={{color: "#0099ffff", backgroundColor: "d5d5d519", fontSize: 13, fontWeight: "bold", textAlign: "center"}}>
        No Items Logged Today
      </Text>
    </View>
  );
}


export default function Index() {
  const [eatingHistory, setEatingHistory] = useState<EatingHistoryRow[]>([]);
  const [caloriesConsumed, setCaloriesConsumed] = useState<number>(0);
  const [proteinConsumed, setProteinConsumed] = useState<number>(0);

  const refresh = useCallback(() => {
    const rows = listEatingHistory();
    setEatingHistory(rows);

    const totals = rows.reduce(
      (acc, f) => {
        acc.calories += f.calories ?? 0;
        acc.protein += f.protein ?? 0;
        return acc;
      },
      { calories: 0, protein: 0 }
    );

    setCaloriesConsumed(totals.calories);
    setProteinConsumed(totals.protein);
  }, []);


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
          <BoldText style={{color: "inherit", flex: 1, textAlign: "center", margin: 10}}>WorkItOut (Alpha)</BoldText>
        </View>

        <ScrollView contentContainerStyle={[styles.content, {flex: 1}]}>
          

          <View style={styles.data}>
            <View style={{flexDirection: "row", marginBottom: 10}}>
              <Text style={{flex: 1, textAlign: "center", color: "#ffffffff"}}>Track calories & protein for today</Text>
          </View>
            <View style={{flexDirection: "row", justifyContent: "center"}}>
              <CircularProgressBar
                progress={caloriesConsumed/daily_calorie_goal*100}
                title="Calories Remaining"
                innerNumber={daily_calorie_goal-caloriesConsumed}
                tintColor="#22b527ff"
                textColor="#22b527ea"
              />

              <CircularProgressBar
                progress={proteinConsumed/daily_protein_goal*100}
                title="Protein Remaining"
                innerNumber={daily_protein_goal-proteinConsumed}
                tintColor="#177cffff"
                textColor="#177cffea"
              />
            </View>
          </View>
   

          <View style={styles.data}>
            <View>
              <Text style={{color: "#ffffffff", fontWeight: "bold", marginLeft: 4, margin: 3, marginTop: 10}}>Stats</Text>
            </View>

            <DataLine title="Calories">
              <Text style={{marginHorizontal: 1, color: "#ffffffff", fontWeight: "500"}}>{caloriesConsumed}</Text>
              <Text style={{marginHorizontal: 1, color: "#a3a3a3ff", fontWeight: "500"}}>/</Text>
              <Text style={{marginHorizontal: 1, color: "#ffffffff", fontWeight: "500"}}>{daily_calorie_goal}</Text>
              <Text style={{marginHorizontal: 1, color: "#a3a3a3ff", fontWeight: "500", fontSize: 10, marginTop: 4}}>kcal</Text>
            </DataLine>

            <DataLine title="Protein">
              <Text style={{marginHorizontal: 1, color: "#ffffffff", fontWeight: "500"}}>{proteinConsumed}</Text>
              <Text style={{marginHorizontal: 1, color: "#a3a3a3ff", fontWeight: "500"}}>/</Text>
              <Text style={{marginHorizontal: 1, color: "#ffffffff", fontWeight: "500"}}>{daily_protein_goal}</Text>
              <Text style={{marginHorizontal: 1, color: "#a3a3a3ff", fontWeight: "500" , fontSize: 10, marginTop: 4}}>g</Text>
            </DataLine>

            <DataLine title="Min Protein Density">
              <Text style={{marginHorizontal: 1, color: "#ffffffff", fontWeight: "500"}}>{calculateProteinDensity(daily_calorie_goal-caloriesConsumed, daily_protein_goal-proteinConsumed)}</Text>
              <Text style={{marginHorizontal: 1, color: "#a3a3a3ff", fontWeight: "500", fontSize: 10, marginTop: 4}}>g/100kcal</Text>
            </DataLine>

            {/* <DataLine
              title="Protein"
              data="400 kcal"
            />

            <DataLine
              title="Calories"
              data="400 kcal"
            /> */}
          </View>


          <View style={{flexDirection: "column", flex: 1}}>
          <View style={[styles.data, {flex: 1}]}>
            <View style={{justifyContent: "space-between", flexDirection: "row"}}>
              <Text style={{fontWeight: "bold", color: "#ffffffff", marginLeft: 5, marginTop: 10}}>Food Logged</Text>
              <Text
                onPress={() => router.push("/(tabs)/log-item")} 
                style={{fontWeight: "bold", color: "#ffffffff", padding: 5, fontSize: 20}}>
                  +
              </Text>
            </View>

            {/* <TitleBarWithPlusBtn
              text="Food Logged Today"
              onPress={() => router.push("/(tabs)/log-item")}
            /> */}
            
            {getFoodLogged(eatingHistory)}

          </View>
          </View>
         
         
              

        </ScrollView>

        <Pressable onPress={() => {
            deleteAllFoodHistory();
            refresh();
          }}
          style={{marginBottom: 30}}  
        >
            <BoldText>DELETE ALL HISTORY</BoldText>
          </Pressable>
    </View>
  );
}