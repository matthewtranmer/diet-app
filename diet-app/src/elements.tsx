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

type dataLineProps = {
  title: string,
  children?: React.ReactNode,
};

export function DataLine({title, children}: dataLineProps){
  return(
    <View style={{flexDirection: "row", justifyContent: "space-between", backgroundColor: "#d5d5d519", padding: 10, marginVertical: 2, borderRadius: 10}}>
      <Text style={{ color: "#ffffffff", fontWeight: "500"}}>{title}</Text>
      {/* <Text style={{ color: "#ffffffff", fontWeight: "bold"}}>{data}</Text> */}
      <View style={{flexDirection: "row"}}>{children}</View>
    </View>
  );
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

function capProgress(progress: number): number{
  if (progress < 1){
    return 1;
  }

  return progress;
}

type circularProgressBarProps = {
  progress: number,
  title: string,
  innerNumber: number,
  tintColor: string,
  textColor?: string,
};

export function CircularProgressBar({progress, title, innerNumber, tintColor, textColor}: circularProgressBarProps){
  return (
      <View style={{margin: 5, marginHorizontal: 15}}>
        <AnimatedCircularProgress
          size={130}
          width={6}
          fill={capProgress(progress)}
          tintColor={tintColor}
          backgroundColor="#a5a5a9ff"
          
          rotation={0}
          lineCap="round"
        >
          {(fill: number) => (
            <View style={{ alignItems: "center" }}>
              <Text style={{fontSize: 30, color: "#ffffffff", fontWeight: "500"}}>{innerNumber}</Text>
              <Text style={{fontSize: 10, color: textColor}}>{title}</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
  );
}

type KPIcardProps = {
  title: string,
  data: number,
  color?: string,
};

export function KPIcard({title, data, color}: KPIcardProps){
  return (
      <View style={styles.cardContent}>
        <View style={styles.cardTitleWrapper}>
          <BoldText style={{ fontSize: 10, textAlign: "center", color: color }}>{title}</BoldText>
        </View>

        <View style={styles.valueWrapper}>
          <BoldText style={{ fontSize: 28, textAlign: "center", color: color }}>{data}</BoldText>
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
        <Text style={{color: "white", fontWeight: "bold", fontSize: 20, padding: 10}} onPress={onPress}>+</Text>
    </View>
  );
}     
