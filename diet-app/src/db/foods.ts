import { db, initDb } from "./db";
import * as Crypto from "expo-crypto";

initDb(); 

export type FoodRow = {
  name: string;
  uuid: number,
  calories: number;
  protein: number;
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
};

export function listEatingHistory(): EatingHistoryRow[] {
  return db.getAllSync<EatingHistoryRow>(`
    SELECT foods.name, foods.calories, foods.protein,
    foods.name, eatingHistory.food_uuid, eatingHistory.created_at FROM foods 
    INNER JOIN eatingHistory
    ON eatingHistory.food_name = foods.name 
    ORDER BY created_at DESC`);
}

export function createFood(name: string, calories: number, protein: number) {
  const uuid = Crypto.randomUUID();

  db.runSync(
    `
    INSERT INTO foods (name, uuid, calories, protein)
    VALUES (?, ?, ?, ?)
    `,
    [name, uuid, calories, protein]
  );
}

export function createFoodEaten(name: string) {
  const createdAt = new Date().toISOString();
  const uuid = Crypto.randomUUID();

  db.runSync(
    `INSERT INTO eatingHistory (food_uuid, food_name, created_at) VALUES (?, ?, ?)`,
    [uuid, name, createdAt]
  );
}

export function deleteAllFoodHistory(){
  db.runSync(
    `DELETE FROM eatingHistory`
  );
}

// SELECT * FROM foods INNER JOIN eatingHistory ON 
// eatingHistory.food_name = foods.name