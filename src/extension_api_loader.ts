import { ExtensionApi } from "./extension_api_types"
import fs from "fs/promises"

export default async function loadExtensionApi(): Promise<ExtensionApi> {
    const loaded = await fs.readFile("./extension_api.json", { encoding: "utf-8" })
    return JSON.parse(loaded)
}