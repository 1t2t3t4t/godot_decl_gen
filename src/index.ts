import loadExtensionApi from "./extension_api_loader"
import {genModuleFuncs} from "./generator/function_generator";
import {easyPrintList, easyPrintNode} from "./easy_print";
import genEnum from "./generator/enum_generator";
import genClass from "./generator/class_generator";

const main = async () => {
    const api = await loadExtensionApi()
    const enums = api.global_enums.map(e => genEnum(e))
    const utilsFuncGroup = groupBy(api.utility_functions, (f) => f.category)

    utilsFuncGroup.forEach((value, key) => {
        console.log(easyPrintNode(genModuleFuncs(key, value)))
    })

    const classes = api.builtin_classes.map(genClass)

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