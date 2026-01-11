import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { styles } from "../../../src/style";
import { FoodItem, TitleBarWithPlusBtn, BoldText } from "../../../src/elements";
import { useEffect, useState } from "react";
import { calculateProteinDensity } from "../../../src/helpers"
import { createFood, listFoods, FoodRow, deleteAllFoods } from "../../../src/db/foods";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";

function getFoods(foods: FoodRow[]){
  if (foods.length > 0){
    return (
      <>
        {foods.map((food) => (
          <FoodItem
            key={food.uuid}
            name={food.name}
            calories={food.calories}
            protein={food.protein}
            pressable={true}
          />
        ))}
      </>
    );
  }
  
  return (
    <View style={styles.foodItem}>
      <Text style={{color: "#0099ffff", fontSize: 13, fontWeight: "bold", textAlign: "center"}}>
        You Have No Foods Saved
      </Text>
    </View>
  );
}


export default function LogFood() {
  const [foods, setFoods] = useState<FoodRow[]>([]);
  
    const refresh = () => {
      setFoods(listFoods());
    };
  
    useEffect(() => {
      refresh();
    }, []);

    useFocusEffect(
      useCallback(() => {
        refresh(); // runs every time this screen becomes active again
      }, [refresh])
    );


  return (
    <View style={styles.container}>
        <View style={styles.viewTitleBar}>
          <Text style={{ color: "#ffffff", paddingHorizontal: 17, paddingVertical: 10, fontSize: 24, fontWeight: "bold"}} onPress={() => router.back()}>
            {"<"}
          </Text>
          <Text style={{color: "#ffffffff", flex: 1, textAlign: "center", alignContent: "center", margin: 10}}>Log An Item</Text>
          <View style={{paddingHorizontal: 25}}></View>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <TitleBarWithPlusBtn
            text="Your Meals"
          />

          <View style={styles.foodItem}>
            <Text style={{color: "#0099ffff", fontSize: 13, fontWeight: "bold", textAlign: "center"}}>
              You Have No Meals Saved
            </Text>
          </View>

          <TitleBarWithPlusBtn
            text="Your Foods"
            onPress={() => router.push("/(tabs)/log-item/add-food")}
          />

          

          {getFoods(foods)}    
        </ScrollView>

        <Pressable onPress={() => {
            deleteAllFoods();
            refresh();
          }}>
            <BoldText>DELETE ALL FOODS</BoldText>
        </Pressable>
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
//     marginHorizontal: 15,
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
//   // pageTitle: {
//   //   textAlign: "center",
//   //   alignSelf: "center",
//   //   color: "inherit",
//   //   fontSize: 14
//   // }

// });
