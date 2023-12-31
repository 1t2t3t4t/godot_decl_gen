import ts, {factory} from "typescript";
import genType, {genIdent} from "./type_generator";

export type FunctionInput = {
    name: string,
    arguments?: ParamInput[],
    return_type?: string
}

export type ParamInput = {
    name: string,
    type?: string
}

export function genParam(input: ParamInput): ts.ParameterDeclaration {
    return factory.createParameterDeclaration(
        undefined,
        undefined,
        genIdent(input.name),
        undefined,
        genType(input.type),
        undefined
    )
}

export default function genFunction(input: FunctionInput): ts.FunctionDeclaration {
    return factory.createFunctionDeclaration(
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        undefined,
        genIdent(input.name),
        undefined,
        input.arguments?.map(p => genParam(p)) ?? [],
        genType(input.return_type),
        undefined
    )
}

export type MethodInput = {
    name: string,
    arguments?: ParamInput[],
    return_type?: string
    return_value?: {
        type: string
    }
}

export function genMethod(input: MethodInput, isStatic: boolean = false): ts.MethodDeclaration {
    let returnType = genType(input.return_type)
    if (input.return_value) {
        returnType = genType(input.return_value.type)
    }

    return factory.createMethodDeclaration(
        isStatic ? [factory.createModifier(ts.SyntaxKind.StaticKeyword)] : undefined,
        undefined,
        genIdent(input.name),
        undefined,
        undefined,
        input.arguments?.map(p => genParam(p)) ?? [],
        returnType,
        undefined
    )
}

export function genModuleFuncs(name: string, input: FunctionInput[]): ts.ModuleDeclaration {
    return factory.createModuleDeclaration(
        [factory.createToken(ts.SyntaxKind.DeclareKeyword)],
        genIdent(name),
        factory.createModuleBlock(
            input.map(genFunction)
        )
    )
}