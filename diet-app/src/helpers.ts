export function calculateProteinDensity(calories: number, protein: number): number{
  if (calories == 0){
    return 0;
  }

  return Math.round(protein/calories*100);
}