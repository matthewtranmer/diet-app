import { ScrollView, View, Text, StyleSheet, Pressable, TextProps } from "react-native";
import { styles } from "./style";
import { router } from "expo-router";
import { calculateProteinDensity } from "./helpers"
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { createFood, createFoodEaten, listFoods, FoodRow } from "../src/db/foods";

export const BoldText = (props: TextProps) => (
  <Text {...props} style={[{ fontWeight: "bold", color: "#ffffffff" }, props.style]} />
);

function returnValues(name: string, calories: number, protein: number) {
  router.replace({
    pathname: "/(tabs)",
    params: {
      id: String(Date.now()),       
      name: String(name),
      calories: String(calories),    
      protein: String(protein),        
    },
  });
}

type foodItemProps = {
  name: string;
  calories: number,
  protein: number,
  pressable: boolean
};

export function FoodItem({ name, calories, protein, pressable }: foodItemProps) {
  return (
   <Pressable style={styles.foodItem} onPress={() => {
    if (pressable){ 
      createFoodEaten(name)
      router.back()
     }
  }}>
      <Text style={styles.foodTitle}>{name}</Text>
      <View style={styles.foodData}>
        <Text style={styles.foodDataValue}>{calories} Kcal</Text>
        <Text style={styles.foodDataValue}>{protein}g Protein</Text>
        <Text style={styles.foodDataValue}>{calculateProteinDensity(calories, protein)} Protein Density</Text>
      </View>
    </Pressable>
  );
}

type circularProgressBarProps = {
  progress: number,
  title: string,
  innerNumber: number,
  tintColor: string,
};

function capProgress(progress: number): number{
  if (progress < 2){
    return 2;
  }

  return progress;
}

export function CircularProgressBar({progress, title, innerNumber, tintColor}: circularProgressBarProps){
  return (
      <View style={{margin: 5, marginHorizontal: 10}}>
        <AnimatedCircularProgress
          size={140}
          width={7}
          fill={capProgress(progress)}
          tintColor={tintColor}
          backgroundColor="#a5a5a9ff"
          rotation={0}
          lineCap="round"
        >
          {(fill: number) => (
            <View style={{ alignItems: "center" }}>
              <BoldText style={{fontSize: 30}}>{innerNumber}</BoldText>
              <BoldText style={{fontSize: 10}}>{title}</BoldText>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
  );
}

type KPIcardProps = {
  title: string,
  data: number,
};

export function KPIcard({title, data}: KPIcardProps){
  return (
      <View style={styles.cardContent}>
        <View style={styles.cardTitleWrapper}>
          <BoldText style={{ fontSize: 10, textAlign: "center" }}>{title}</BoldText>
        </View>

        <View style={styles.valueWrapper}>
          <BoldText style={{ fontSize: 28, textAlign: "center" }}>{data}</BoldText>
        </View>
      </View>
  );
}

type titleBarWithPlusBtnProps = {
  text: string,
  onPress?: () => void,
};

export function TitleBarWithPlusBtn({text, onPress}: titleBarWithPlusBtnProps){
  return (
    <View style={styles.titleBar}>
        <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>{text}</Text>
        <Text style={{color: "white", fontWeight: "bold", fontSize: 20, padding: 6}} onPress={onPress}>+</Text>
    </View>
  );
}     

type dataDisplayProps = {
  title: string,
  data: string
};

export function DataDisplay({title, data}: dataDisplayProps){
  return (
    <View style={{padding: 10, marginHorizontal: 10, flexDirection: "row", justifyContent: "space-between"}}>
      <Text>{title}</Text>
      <Text>{data}</Text>
    </View>
  );
}