import { ScrollView, View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

type foodItemProps = {
  name: string;
  calories: number,
  protein: number,
  protein_density: number,
  onPress?: () => void,
};

export function FoodItem({ name, calories, protein, protein_density, onPress }: foodItemProps) {
  return (
   <Pressable style={styles.foodItem} onPress={onPress}>
      <Text style={styles.foodTitle}>{name}</Text>
      <View style={styles.foodData}>
        <Text style={styles.foodDataValue}>{calories} Kcal</Text>
        <Text style={styles.foodDataValue}>{protein}g Protein</Text>
        <Text style={styles.foodDataValue}>{protein_density} Protein Density</Text>
      </View>
    </Pressable>
  );
}

export default function LogFood() {
  return (
    <View style={styles.container}>
        <View style={styles.viewTitleBar}>
          <Text style={{ color: "#ffffff", padding: 10}} onPress={() => router.back()}>
            {"<"}
          </Text>
          <Text style={{color: "inherit", flex: 1, textAlign: "center", margin: 10}}>Log An Item</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.titleBar}>
            <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>Your Meals</Text>
            <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>+</Text>
          </View>
        
          <FoodItem
            name="Chicken Breast"
            calories={165}
            protein={31}
            protein_density={19}
          />


          <View style={styles.titleBar}>
            <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>Your Foods</Text>
            <Text style={{color: "white", fontWeight: "bold", fontSize: 20}} onPress={() => router.push("/(tabs)/log-item/add-food")}>+</Text>
          </View>
        
          <FoodItem
            name="Chicken Breast"
            calories={165}
            protein={31}
            protein_density={19}
          />
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    width: "100%",
    backgroundColor: "black",
    padding: 15,
  },
  content: {
    marginHorizontal: 15,
    marginVertical: 5,
    color: "#d6d6d6ff",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#171725ff"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff"
  },
  foodItem: {
    borderRadius: 10,
    backgroundColor: '#262637ff',
    padding: 15,
    marginBottom: 5,
  },
  foodTitle: {
    color: "#d6d6d6ff",
  },
  foodDataValue: {
    color: "#9f9f9fff",
    paddingRight: 10,
  },
  foodData: {
    flex: 1,
    flexDirection: "row",
  },
  titleBar: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  viewTitleBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    color: "white",
    fontWeight: "bold",
  },
  // pageTitle: {
  //   textAlign: "center",
  //   alignSelf: "center",
  //   color: "inherit",
  //   fontSize: 14
  // }

});
