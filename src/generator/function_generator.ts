import ts, {factory} from "typescript";
import genType from "./type_generator";

export type FunctionInput = {
    name: string,
    arguments?: ParamInput[],
    return_type?: string
}

export type ParamInput = {
    isVarargs?: boolean,
    name: string,
    type?: string
}

export function genParam(input: ParamInput): ts.ParameterDeclaration {
    return factory.createParameterDeclaration(
        undefined,
        undefined,
        input.name,
        undefined,
        genType(input.type),
        undefined
    )
}

export default function genFunction(input: FunctionInput): ts.FunctionDeclaration {
    return factory.createFunctionDeclaration(
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        undefined,
        input.name,
        undefined,
        input.arguments?.map(p => genParam(p)) ?? [],
        genType(input.return_type),
        undefined
    )
}