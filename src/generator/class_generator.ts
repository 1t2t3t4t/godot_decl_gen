import ts, {factory} from "typescript";
import {FunctionInput, genMethod} from "./function_generator";
import genType, {genIdent} from "./type_generator";

export type MemberInput = {
    name: string
    type: string
}

export function genMember(input: MemberInput): ts.PropertyDeclaration {
    return factory.createPropertyDeclaration(
        undefined,
        genIdent(input.name),
        undefined,
        genType(input.type),
        undefined
    )
}

export type PropertyInput = {
    type: string
    name: string
    setter?: string
    getter: string
}

export function genProperty(input: PropertyInput): (ts.GetAccessorDeclaration | ts.SetAccessorDeclaration)[] {
    let results: (ts.GetAccessorDeclaration | ts.SetAccessorDeclaration)[] = [
        factory.createGetAccessorDeclaration(
            undefined,
            genIdent(input.name),
            [],
            genType(input.type),
            undefined
        )
    ]
    if (input.setter) {
        results.push(
            factory.createSetAccessorDeclaration(
                undefined,
                genIdent(input.name),
                [
                    factory.createParameterDeclaration(
                        undefined,
                        undefined,
                        factory.createIdentifier("newVal"),
                        undefined,
                        genType(input.type),
                        undefined
                    )
                ],
                undefined
            )
        )
    }

    return results
}

type ClassInput = {
    name: string
    methods?: FunctionInput[]
}

export default function genClass(input: ClassInput): ts.ClassDeclaration {
    return factory.createClassDeclaration(
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        genIdent(input.name),
        undefined,
        undefined,
        [
            ...(input.methods?.map(genMethod) ?? [])
        ]
    )
}