import { ScrollView, View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { styles } from "../../../src/style";
import { createFood, createFoodEaten, listFoods, FoodRow } from "../../../src/db/foods";
import * as Crypto from "expo-crypto";

type TabItem<K extends string = string> = {
  key: K;
  label: string;
};

type SegmentedTabsProps<K extends string = string> = {
  tabs: TabItem<K>[];
  activeKey: K;
  onChange: (key: K) => void;
};

function SegmentedTabs<K extends string>({tabs, activeKey, onChange}: SegmentedTabsProps<K>) {
  return (
    <View style={styles.tabBar}>
      {tabs.map((t) => {
        const active = t.key === activeKey;

        return (
          <Pressable
            key={t.key}
            onPress={() => onChange(t.key)}
            style={[styles.tab, active && styles.tabActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <Text style={[styles.tabText]}>
              {t.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

type screenAProps = {
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  calories: string,
  setCalories: React.Dispatch<React.SetStateAction<string>>
  protein: string,
  setProtein: React.Dispatch<React.SetStateAction<string>>
}

// Create Food
function ScreenA({name, setName, calories, setCalories, protein, setProtein}: screenAProps) {
  return (
    <View style={styles.screen}>
      <Text style={{padding: 10, fontSize: 10, fontWeight: "bold", color: "#a5a5a5ff"}}>Create Food Item</Text>
    
      <View style={styles.inputTable}>
        <View style={styles.inputBox}>
            <Text style={styles.inputBoxTitle}>Food Name</Text>
            <TextInput  
              value={name}
              onChangeText={setName}
              placeholder="Required" 
              placeholderTextColor="#464646ff" 
              style={{textAlign: "right", height: 50, color: "#2179cbff", flex: 1}} 
            />
        </View>

        <View style={styles.inputBox}>
            <Text style={styles.inputBoxTitle}>Calories</Text>
            <TextInput 
              value={calories}
              onChangeText={setCalories}
              placeholder="Required" 
              placeholderTextColor="#464646ff" 
              style={{textAlign: "right", height: 50, color: "#2179cbff", flex: 1}} 
            />
        </View>

        <View style={styles.inputBox}>
            <Text style={styles.inputBoxTitle}>Protein</Text>
            <TextInput 
              value={protein}
              onChangeText={setProtein}
              placeholder="Required" 
              placeholderTextColor="#464646ff" 
              style={{textAlign: "right", height: 50, color: "#2179cbff", flex: 1}} 
            />
        </View>
      </View>
    </View>
  );
}

// Create Meal
function ScreenB() {
  return (
     <View style={styles.screen}>
        <View style={{paddingHorizontal: 15}}>
            <Text style={{padding: 10, fontSize: 10, fontWeight: "bold", color: "#a5a5a5ff"}}>Create Meal</Text>

            <View style={styles.titleBar}>
                <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>Add Foods</Text>
                <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>+</Text>
                </View>
            
                <View style={styles.foodItem}>
                <Text style={styles.foodTitle}>Banana</Text>
                <View style={styles.foodData}>
                    <Text style={styles.foodDataValue}>100 Kcal</Text>
                    <Text style={styles.foodDataValue}>10g Protein</Text>
                    <Text style={styles.foodDataValue}>10 Protein Density</Text>
                </View>
            </View>
        </View>
    </View>
  );
}

function submit(name: string, calories: number, protein: number){
  createFood(name, calories, protein);
  router.back()
}

export default function LogFood() {
    type Key = "a" | "b";
    const [active, setActive] = useState<Key>("a");
    const [name, setName] = useState<string>("");
    const [calories, setCalories] = useState<string>("");
    const [protein, setProtein] = useState<string>("");


    return (
    <View style={styles.container}>
        <View style={styles.viewTitleBar}>
            <Text style={{ color: "#ffffff", padding: 20}} onPress={() => router.back()}>
            {"<"}
            </Text>
            <Text style={{color: "#ffffffff", flex: 1,textAlign: "center", margin: 10}}>Create Item</Text>
            <Text style={{ color: "#ffffff", padding: 20}} onPress={() => submit(name, Number(calories), Number(protein))}>✓</Text>
        </View>

        <ScrollView>
            <View>
                <SegmentedTabs<Key>
                    tabs={[
                        { key: "a", label: "Food" },
                        { key: "b", label: "Meal" },
                    ]}
                    activeKey={active}
                    onChange={setActive}
                />

                <View>
                    {active === "a" ? <ScreenA 
                    name={name}
                    setName={setName}
                    calories={calories}
                    setCalories={setCalories}
                    protein={protein}
                    setProtein={setProtein}
                    /> : 
                    <ScreenB />}
                </View>
            </View>
        </ScrollView>
    </View>
    );
}

// const styles = StyleSheet.create({
//   nav: {
//     width: "100%",
//     backgroundColor: "black",
//     padding: 15,
//   },
//   content: {
//     marginVertical: 5,
//     color: "#d6d6d6ff",
//   },
//   container: {
//     flex: 1,
//     width: "100%",
//     backgroundColor: "#171725ff"
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#fff"
//   },
//   foodItem: {
//     borderRadius: 10,
//     backgroundColor: '#262637ff',
//     padding: 15,
//     marginBottom: 5,
//   },
//   foodTitle: {
//     color: "#d6d6d6ff",
//   },
//   foodDataValue: {
//     color: "#9f9f9fff",
//     paddingRight: 10,
//   },
//   foodData: {
//     flex: 1,
//     flexDirection: "row",
//   },
//   titleBar: {
//     flexDirection: "row",
//     alignSelf: "stretch",
//     justifyContent: "space-between",
//     alignItems: "center",
//     margin: 10,
//   },
//   viewTitleBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",

//     color: "white",
//     fontWeight: "bold",
//   },
//   tabBar: {
//     flexDirection: "row",
//     marginHorizontal: 16,
//     borderRadius: 12,
//     padding: 4,
//     backgroundColor:  "#ffffff13",
//   },
//   tabActive: {
//     backgroundColor: "#ffffff1f"
//   },
//   tab: {
//     flex: 1,
//     paddingVertical: 10,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   tabText: {
//     fontSize: 14, 
//     fontWeight: "600", 
//     color: "#ffffffff"
//   },
//   screen: {
//     flex: 1, 
//     paddingBottom: 15,
//   },
//   inputTable: {},
//   inputBox: {
//     backgroundColor: "#ffffff13",
//     padding: 10,
//     borderColor: "#6e6e6eff",
//     borderTopWidth: 0.3,
//     flexDirection: "row",
//     alignSelf: "stretch",
//     justifyContent: "space-between",
//   },
//   inputBoxTitle: {
//     color: "#ffffffff"
//   }

// });
