import loadExtensionApi from "./extension_api_loader"
import genFunction from "./generator/function_generator";
import {easyPrintList} from "./easy_print";
import genEnum from "./generator/enum_generator";

const main = async () => {
    const api = await loadExtensionApi()
    const enums = api.global_enums.map(e => genEnum(e))
    const utilFuncs = api.utility_functions.map(f => genFunction(f))


    console.log(easyPrintList(enums))
    console.log(easyPrintList(utilFuncs))
    process.exit(0)
}

main()