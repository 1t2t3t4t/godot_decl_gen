import loadExtensionApi from "./extension_api_loader"
import {genModuleFuncs} from "./generator/function_generator";
import {easyPrintList, easyPrintNode} from "./easy_print";
import genEnum from "./generator/enum_generator";
import genClass from "./generator/class_generator";
import fs from "fs/promises";
import fsSync from "fs"
import {ModuleDeclaration} from "typescript";

const outputDir = "./out"

if (!fsSync.existsSync(outputDir)) {
    fsSync.mkdir(outputDir, () => {})
}

const main = async () => {
    const api = await loadExtensionApi()
    const enums = api.global_enums.map(e => genEnum(e))

    await fs.writeFile(`${outputDir}/global_enum.d.ts`, easyPrintList(enums))

    const utilsFuncGroup = groupBy(api.utility_functions, (f) => f.category)

    let utilFuncModules: ModuleDeclaration[] = []
    utilsFuncGroup.forEach((value, key) => {
        utilFuncModules.push(genModuleFuncs(key, value))
    })
    await fs.writeFile(`${outputDir}/until_functions.d.ts`, easyPrintList(utilFuncModules))

    const builtinClasses = api.builtin_classes.map(genClass)
    await fs.writeFile(`${outputDir}/builtin_classes.d.ts`, easyPrintList(builtinClasses))

    const classes = api.classes.map(genClass)

    console.log(easyPrintList(classes))

    process.exit(0)
}

const groupBy = <T, K>(array: T[], keyGetter: (val: T) => K): Map<K, T[]> => {
    let result = new Map<K, T[]>()
    for (const val of array) {
        const key = keyGetter(val)
        if (!result.has(key)) {
            result.set(key, [])
        }

        const members = result.get(key)
        members?.push(val)
        result.set(key, members!)
    }
    return result
}


main()