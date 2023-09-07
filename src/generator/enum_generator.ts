import ts, { EnumDeclaration, EnumMember, NumericLiteral, StringLiteral, factory } from "typescript"
import GeneratorArtifacts from "./generator_artifacts"

export type EnumCase = {
    name: string,
    value?: string | number
}

export type EnumInput = {
    exported?: boolean,
    name: string,
    cases: EnumCase[]
}

export default class EnumGenerator {
    gen(input: EnumInput): EnumDeclaration {
        let sanitizedName = input.name
        if (sanitizedName.includes(".")) {
            sanitizedName = sanitizedName.split(".").join("_")
            GeneratorArtifacts.shared.addRenameMap(sanitizedName, input.name)
        }

        return factory.createEnumDeclaration(
            input.exported ? [factory.createModifier(ts.SyntaxKind.ExportKeyword)] : undefined,
            factory.createIdentifier(sanitizedName),
            input.cases.map(this.genCase.bind(this))
        )
    }

    private genCase(enumCase: EnumCase): EnumMember {
        const enumValue = (value: string | number): NumericLiteral | StringLiteral => {
            if (typeof value === "string") {
                return factory.createStringLiteral(value)
            } else {
                return factory.createNumericLiteral(value.toString())
            }
        }
        return factory.createEnumMember(
            factory.createIdentifier(enumCase.name),
            enumCase.value ? enumValue(enumCase.value) : undefined
        )
    }
}