import path from "path";
import {promises} from "fs";
import { JsonModelData } from "next-office-generator/types/GenericModel";

export async function readJsonSchema() {
    const jsonFilePath = path.join(process.cwd(), 'prisma/generated/json/json-schema.json');
    const jsonData = await promises.readFile(jsonFilePath, 'utf8');
    const jsonModelData: JsonModelData = JSON.parse(jsonData);
    return jsonModelData;
}
