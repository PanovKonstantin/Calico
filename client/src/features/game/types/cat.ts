import CellType from "./cell";
import { Pattern } from "./tile";

interface BaseCatType {
  name: string;
  level: number;
  points: number;
  patterns: Pattern[];
}
interface SizeCatType extends BaseCatType {
  size: number;
}
interface ShapeCatType extends BaseCatType {
  shape: { [key: string]: CellType };
}
type CatType = SizeCatType & ShapeCatType;
export default CatType;
