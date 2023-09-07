import ts from "typescript"
import loadExtensionApi from "./extension_api_loader"
import EnumGenerator from "./generator/enum_generator"
import GeneratorArtifacts from "./generator/generator_artifacts"

const main = async () => {
    const api = await loadExtensionApi()
    const gener = new EnumGenerator()
    const result = api.global_enums
        .map((raw) => {
            return {
                exported: true,
                name: raw.name,
                cases: raw.values.map((v) => {
                    return {
                        name: v.name,
                        value: v.value
                    }
                })
            }
        }).map(gener.gen.bind(gener))

    const printer = ts.createPrinter()
    const source = ts.createSourceFile("temp.ts", "", ts.ScriptTarget.ES2016)

    const output = printer.printList(ts.ListFormat.MultiLine, ts.factory.createNodeArray(result), source)
    console.log(output)
    process.exit(0)
}

main()