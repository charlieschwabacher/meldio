import { visit, QueryDocumentKeys } from '../language/visitor';


export const SchemaKeys = {
  Name: QueryDocumentKeys.Name,

  Document: QueryDocumentKeys.Document,

  IntValue: QueryDocumentKeys.IntValue,
  FloatValue: QueryDocumentKeys.FloatValue,
  StringValue: QueryDocumentKeys.StringValue,
  BooleanValue: QueryDocumentKeys.BooleanValue,
  EnumValue: QueryDocumentKeys.EnumValue,
  ListValue: QueryDocumentKeys.ListValue,
  ObjectValue: QueryDocumentKeys.ObjectValue,
  ObjectField: QueryDocumentKeys.ObjectField,

  Directive: QueryDocumentKeys.Directive,

  NamedType: QueryDocumentKeys.NamedType,
  ListType: QueryDocumentKeys.ListType,
  NonNullType: QueryDocumentKeys.NonNullType,

  ScalarTypeDefinition: QueryDocumentKeys.ScalarTypeDefinition,
  ObjectTypeDefinition: QueryDocumentKeys.ObjectTypeDefinition,
  FieldDefinition: QueryDocumentKeys.FieldDefinition,
  InputValueDefinition: QueryDocumentKeys.InputValueDefinition,
  InterfaceTypeDefinition: QueryDocumentKeys.InterfaceTypeDefinition,
  UnionTypeDefinition: QueryDocumentKeys.UnionTypeDefinition,
  EnumTypeDefinition: QueryDocumentKeys.EnumTypeDefinition,
  EnumValueDefinition: QueryDocumentKeys.EnumValueDefinition,
  InputObjectTypeDefinition: QueryDocumentKeys.InputObjectTypeDefinition,

  TypeExtensionDefinition: QueryDocumentKeys.TypeExtensionDefinition,

  DirectiveDefinition: QueryDocumentKeys.DirectiveDefinition,

  MutationDefinition: QueryDocumentKeys.MutationDefinition,
  MutationFieldDefinition: QueryDocumentKeys.MutationFieldDefinition,
  QueryDefinition: QueryDocumentKeys.QueryDefinition,
  QueryFieldDefinition: QueryDocumentKeys.QueryFieldDefinition,
  FilterDefinition: QueryDocumentKeys.FilterDefinition,
  FilterCondition: QueryDocumentKeys.FilterCondition,
  OrderDefinition: QueryDocumentKeys.OrderDefinition,
  OrderExpression: QueryDocumentKeys.OrderExpression,
  ConnectionType: QueryDocumentKeys.ConnectionType,
  ConnectionJoinType: QueryDocumentKeys.ConnectionJoinType,
  EdgeType: QueryDocumentKeys.EdgeType,
};

export function visitAST(root, visitor, keys) {
  return visit(root, visitor, keys || SchemaKeys);
}
