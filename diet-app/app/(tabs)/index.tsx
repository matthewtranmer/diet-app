import { ScrollView, View, Text, StyleSheet, TextProps } from "react-native";
import { router } from "expo-router";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export const BoldText = (props: TextProps) => (
  <Text {...props} style={[{ fontWeight: "bold", color: "#ffffffff" }, props.style]} />
);
var calories = 2500; 
var daily_calories = 3000;

var protein = 142;
var daily_protein = 187;

export default function Index() {
  return (
    <View style={styles.container}>
        <View style={styles.viewTitleBar}>
          <BoldText style={{color: "inherit", flex: 1, textAlign: "center", margin: 10}}>Diet App</BoldText>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.data}>
            <View style={{flexDirection: "row", justifyContent: "center"}}>
              <View style={{margin: 10}}>
                <AnimatedCircularProgress
                size={160}
                width={12}
                fill={calories/daily_calories*100}
                tintColor="#4CAF50"
                backgroundColor="#e8e8e8"
                rotation={0}
                lineCap="round"
                >
                  {(fill: number) => (
                    <View style={{ alignItems: "center" }}>
                      <BoldText style={{fontSize: 30}}>{daily_calories-calories}</BoldText>
                      <BoldText style={{fontSize: 10}}>Remaining Calories</BoldText>
                    </View>
                  )}
                </AnimatedCircularProgress>
              </View>
              
              <View style={{margin: 10}}>
                <AnimatedCircularProgress
                  size={160}
                  width={12}
                  fill={protein/daily_protein*100}
                  tintColor="#177cffff"
                  backgroundColor="#e8e8e8"
                  rotation={0}
                  lineCap="round"
                >
                  {(fill: number) => (
                    <View style={{ alignItems: "center" }}>
                      <BoldText style={{fontSize: 30}}>{daily_protein-protein}</BoldText>
                      <BoldText style={{fontSize: 10}}>Protein Remaining</BoldText>
                    </View>
                  )}
                </AnimatedCircularProgress>
              </View>
            </View>
            {/* <View>
            <BoldText>Current Calories</BoldText>
            <BoldText>Current Protein</BoldText>
            <BoldText>Minimum Protein Density Needed</BoldText>
          </View> */}

          </View>

          <View style={{flexDirection: "row"}}>
            <View style={styles.data}>
              <View style={styles.cardContent}>
                <View style={styles.cardTitleWrapper}>
                  <BoldText style={{ fontSize: 10 }}>Current Calories Consumed</BoldText>
                </View>

                <View style={styles.valueWrapper}>
                  <BoldText style={{ fontSize: 26 }}>5</BoldText>
                </View>
               </View>
            </View>

            <View style={styles.data}>
              <View style={styles.cardContent}>
                <View style={styles.cardTitleWrapper}>
                  <BoldText style={{ fontSize: 10 }}> Current Protein Consumed
                  </BoldText>
                </View>

                <View style={styles.valueWrapper}>
                  <BoldText style={{ fontSize: 26 }}>5</BoldText>
                </View>
               </View>
              </View>

            <View style={styles.data}>
              <View style={styles.cardContent}>
                <View style={styles.cardTitleWrapper}>
                  <BoldText style={{ fontSize: 10 }}>Minimum Protein Density Needed</BoldText>
                </View>

                <View style={styles.valueWrapper}>
                  <BoldText style={{ fontSize: 26 }}>5</BoldText>
                </View>
               </View>
              </View>

          </View>

          <View style={styles.titleBar}>
              <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>Food Logged Today</Text>
              <Text style={{color: "white", fontWeight: "bold", fontSize: 20}} onPress={() => router.push("/(tabs)/log-item")}>+</Text>
            </View>
          
            <View style={styles.foodItem}>
              <Text style={styles.foodTitle}>Banana</Text>
              <View style={styles.foodData}>
                <Text style={styles.foodDataValue}>100 Kcal</Text>
                <Text style={styles.foodDataValue}>10g Protein</Text>
                <Text style={styles.foodDataValue}>10 Protein Density</Text>
              </View>
            </View>

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
    backgroundColor: "#65656534",
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
  data: {
    flex: 1,
    backgroundColor: '#262637ff',
    borderRadius: 10,
    padding: 12,
    margin: 5,
  },

  cardContent: {
    height: 90,
  },

  cardTitleWrapper: {
    height: 24,              // or whatever works visually
    justifyContent: 'flex-start',
  },

  valueWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // pageTitle: {
  //   textAlign: "center",
  //   alignSelf: "center",
  //   color: "inherit",
  //   fontSize: 14
  // }

});


// backgroundColor: "#262637ff",