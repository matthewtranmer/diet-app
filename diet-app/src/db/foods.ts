import { db, initDb } from "./db";
import * as Crypto from "expo-crypto";

initDb(); 

export type FoodRow = {
  name: string;
  uuid: number,
  calories: number;
  protein: number;
  weight: number,
};

export function listFoods(): FoodRow[] {
  return db.getAllSync<FoodRow>(`SELECT * FROM foods`);
}

export type EatingHistoryRow = {
  name: string;
  calories: number;
  protein: number;
  food_uuid: number,
  created_at: string;
  original_weight: number;
  selected_weight: number;
};

// export function test(){
//   // console.log(db.getAllSync("SELECT * FROM eatingHistory"));
//   // console.log(db.getAllSync("PRAGMA table_info(eatingHistory)"));

//   console.log(db.getAllSync<EatingHistoryRow>(`
//     SELECT foods.name, foods.calories, foods.protein,
//     eatingHistory.food_uuid, eatingHistory.created_at, foods.weight AS original_weight, eatingHistory.weight AS selected_weight FROM foods 
//     INNER JOIN eatingHistory
//     ON eatingHistory.food_name = foods.name 
//     ORDER BY created_at DESC`));
// }


export function listEatingHistory(): EatingHistoryRow[] {
  return db.getAllSync<EatingHistoryRow>(`
    SELECT foods.name, foods.calories, foods.protein,
    eatingHistory.food_uuid, eatingHistory.created_at, foods.weight AS original_weight, eatingHistory.weight AS selected_weight FROM foods 
    INNER JOIN eatingHistory
    ON eatingHistory.food_name = foods.name 
    ORDER BY created_at DESC`);
}

export function getFood(name: string){
  return db.getFirstSync<FoodRow>("SELECT * FROM foods WHERE name = ?", name)
}

export function createFood(name: string, calories: number, protein: number, weight: number) {
  const uuid = Crypto.randomUUID();

  db.runSync(
    `
    INSERT INTO foods (name, uuid, calories, protein, weight)
    VALUES (?, ?, ?, ?, ?)
    `,
    [name, uuid, calories, protein, weight]
  );
}

export function createFoodEaten(name: string, weight: number) {
  const createdAt = new Date().toISOString();
  const uuid = Crypto.randomUUID();

  db.runSync(
    `INSERT INTO eatingHistory (food_uuid, food_name, created_at, weight) VALUES (?, ?, ?, ?)`,
    [uuid, name, createdAt, weight]
  );
}

export function deleteAllFoodHistory(){
  db.runSync(
    `DELETE FROM eatingHistory`
  );
}

export function deleteAllFoods(){
  db.runSync(
    `DELETE FROM foods`
  );
}

export function deleteFromFoods(uuid: number){
  db.runSync(
    `DELETE FROM foods WHERE uuid = ?`,
    uuid
  );
}

export function deleteFromFoodHistory(uuid: number){
  db.runSync(
    `DELETE FROM eatingHistory WHERE food_uuid = ?`,
    uuid
  );
}
// SELECT * FROM foods INNER JOIN eatingHistory ON 
// eatingHistory.food_name = foods.name