import ts, { EnumDeclaration, EnumMember, NumericLiteral, StringLiteral, factory } from "typescript"
import GeneratorArtifacts from "./generator_artifacts"
import {genIdent} from "./type_generator";

export type EnumCase = {
    name: string,
    value?: string | number
}

export type EnumInput = {
    name: string,
    values: EnumCase[]
}

export default function genEnum(input: EnumInput): EnumDeclaration {
    return factory.createEnumDeclaration(
        [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        genIdent(input.name),
        input.values.map(genCase)
    )
}

function genCase(enumCase: EnumCase): EnumMember {
    const enumValue = (value: string | number): NumericLiteral | StringLiteral => {
        if (typeof value === "string") {
            return factory.createStringLiteral(value)
        } else {
            return factory.createNumericLiteral(value.toString())
        }
    }
    return factory.createEnumMember(
        genIdent(enumCase.name),
        enumCase.value ? enumValue(enumCase.value) : undefined
    )
}