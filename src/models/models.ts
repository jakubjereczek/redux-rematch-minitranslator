import { Models } from "@rematch/core";
import { word } from "./wordModel";

export interface RootModel extends Models<RootModel> {
    word: typeof word;
}
export const models: RootModel = {
    word
};