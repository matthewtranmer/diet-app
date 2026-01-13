import { ScrollView, View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { styles } from "../../../src/style";
import { createFood, createFoodEaten, listFoods, FoodRow, getFood } from "../../../src/db/foods";
import * as Crypto from "expo-crypto";
import { DataTile } from "../../../src/elements";
import { useLocalSearchParams } from "expo-router";


// function submit(name: string, calories: number, protein: number, weight: number){
//   createFood(name, calories, protein, weight);
//   router.back()
// }

type State = {
    weight: string, 
    setWeight: React.Dispatch<React.SetStateAction<string>>, 
    calories: string, 
    setCalories: React.Dispatch<React.SetStateAction<string>>, 
    protein: string, 
    setProtein: React.Dispatch<React.SetStateAction<string>>,
};

type Params = {
  foodName: string,
};

function onWeightUpdated(weight: string, dbWeight: number, dbCalories: number, dbProtein: number, state: State)
{
    state.setWeight(weight)

    var newCalories = dbCalories / dbWeight * Number(weight)
    state.setCalories(String(newCalories))

    var newProtein = dbProtein / dbWeight * Number(weight)
    state.setProtein(String(newProtein))
}

export default function LogFood() {
    const { foodName } = useLocalSearchParams<Params>();

    var dbWeight = 0;
    var dbCalories = 0;
    var dbProtein = 0;

    var foodRow = getFood(foodName);
    if (foodRow){
        dbWeight = foodRow.weight;
        dbCalories = foodRow.calories;
        dbProtein = foodRow.protein;
    }

    const [weight, setWeight] = useState<string>(String(dbWeight));
    const [calories, setCalories] = useState<string>(String(dbCalories));
    const [protein, setProtein] = useState<string>(String(dbProtein));

    var state = {weight, setWeight, calories, setCalories, protein, setProtein}

    return (
    <View style={styles.container}>
        <View style={styles.viewTitleBar}>
            <Text style={{ color: "#ffffff", padding: 20}} onPress={() => router.back()}>
            {"<"}
            </Text>
            <Text style={{color: "#ffffffff", flex: 1,textAlign: "center", margin: 10}}>Adjust Serving Weight</Text>
            <Text style={{ color: "#ffffff", padding: 20}} onPress={() => {
                createFoodEaten(foodName, Number(weight))
                router.replace("/(tabs)")
            }}>✓</Text>
        </View>

        <ScrollView>
            <View style={{}}>
                <Text style={{color: "#ffffffff", fontSize: 26, fontWeight: "bold", marginBottom: 30, marginLeft: 13}}>Food Name</Text>
                
                 <View style={[styles.inputTable, {marginHorizontal: 10}]}>
                    <View style={[styles.inputBox, {marginBottom: 20, borderRadius: 10}]}>
                        <Text style={styles.inputBoxTitle}>Weight</Text>
                        <TextInput  
                            value={weight}
                            onChangeText={(text) => onWeightUpdated(text, dbWeight, dbCalories, dbProtein, state)}
                            placeholder="Required" 
                            placeholderTextColor="#464646ff" 
                            style={{textAlign: "right", height: 50, color: "#2179cbff", flex: 1}} 
                        />
                    </View>
                </View>
                
                <View style={{ flexDirection: "row", backgroundColor: "#" }}>
                    <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                        <DataTile data={calories} unit="kcal" text="Calories" />
                        <DataTile data={protein} unit="g" text="Protein" />
                    </View>
                </View>

               
                

                {/* <Text style={{color: "#ffffffff"}}>Protein</Text> */}
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
