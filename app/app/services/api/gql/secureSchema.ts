import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Match = {
  __typename?: 'Match';
  assists?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  matchId?: Maybe<Scalars['String']['output']>;
  minutes?: Maybe<Scalars['Int']['output']>;
  opponentPenalties?: Maybe<Scalars['Int']['output']>;
  opponentScore?: Maybe<Scalars['Int']['output']>;
  opponentShots?: Maybe<Scalars['Int']['output']>;
  opponentXG?: Maybe<Scalars['Float']['output']>;
  scorers?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  tutPk: Scalars['String']['output'];
  tutSk: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
  userPenalties?: Maybe<Scalars['Int']['output']>;
  userPossession?: Maybe<Scalars['Int']['output']>;
  userReds?: Maybe<Scalars['Int']['output']>;
  userScore?: Maybe<Scalars['Int']['output']>;
  userShots?: Maybe<Scalars['Int']['output']>;
  userXG?: Maybe<Scalars['Float']['output']>;
  userYellows?: Maybe<Scalars['Int']['output']>;
};

export type MatchInput = {
  assists?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  minutes?: InputMaybe<Scalars['Int']['input']>;
  opponentPenalties?: InputMaybe<Scalars['Int']['input']>;
  opponentScore?: InputMaybe<Scalars['Int']['input']>;
  opponentShots?: InputMaybe<Scalars['Int']['input']>;
  opponentXG?: InputMaybe<Scalars['Float']['input']>;
  scorers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
  userPenalties?: InputMaybe<Scalars['Int']['input']>;
  userPossession?: InputMaybe<Scalars['Int']['input']>;
  userReds?: InputMaybe<Scalars['Int']['input']>;
  userScore?: InputMaybe<Scalars['Int']['input']>;
  userShots?: InputMaybe<Scalars['Int']['input']>;
  userXG?: InputMaybe<Scalars['Float']['input']>;
  userYellows?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMatch?: Maybe<Match>;
};


export type MutationCreateMatchArgs = {
  input: MatchInput;
};

export type Query = {
  __typename?: 'Query';
  getMatchesByUser?: Maybe<Array<Maybe<Match>>>;
  getUserByEmail?: Maybe<User>;
  getUserStats?: Maybe<UserStats>;
};


export type QueryGetMatchesByUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetUserStatsArgs = {
  userId: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  googleId?: Maybe<Scalars['String']['output']>;
  tutPk: Scalars['String']['output'];
  tutSk: Scalars['String']['output'];
  userId?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserStats = {
  __typename?: 'UserStats';
  averageOpponentGoals?: Maybe<Scalars['Float']['output']>;
  averageOpponentShots?: Maybe<Scalars['Float']['output']>;
  averageOpponentXG?: Maybe<Scalars['Float']['output']>;
  averagePossession?: Maybe<Scalars['Float']['output']>;
  averageUserGoals?: Maybe<Scalars['Float']['output']>;
  averageUserShots?: Maybe<Scalars['Float']['output']>;
  averageUserXG?: Maybe<Scalars['Float']['output']>;
  draws?: Maybe<Scalars['Int']['output']>;
  gamesCount?: Maybe<Scalars['Int']['output']>;
  losses?: Maybe<Scalars['Int']['output']>;
  rageQuits?: Maybe<Scalars['Int']['output']>;
  totalOpponentGoals?: Maybe<Scalars['Int']['output']>;
  totalOpponentShots?: Maybe<Scalars['Int']['output']>;
  totalOpponentXG?: Maybe<Scalars['Float']['output']>;
  totalUserGoals?: Maybe<Scalars['Int']['output']>;
  totalUserShots?: Maybe<Scalars['Int']['output']>;
  totalUserXG?: Maybe<Scalars['Float']['output']>;
  winRate?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Match: ResolverTypeWrapper<Match>;
  MatchInput: MatchInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserStats: ResolverTypeWrapper<UserStats>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Match: Match;
  MatchInput: MatchInput;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  User: User;
  UserStats: UserStats;
};

export type MatchResolvers<ContextType = any, ParentType extends ResolversParentTypes['Match'] = ResolversParentTypes['Match']> = {
  assists?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  matchId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  opponentPenalties?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  opponentScore?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  opponentShots?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  opponentXG?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  scorers?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  tutPk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tutSk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userPenalties?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  userPossession?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  userReds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  userScore?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  userShots?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  userXG?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  userYellows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createMatch?: Resolver<Maybe<ResolversTypes['Match']>, ParentType, ContextType, RequireFields<MutationCreateMatchArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getMatchesByUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['Match']>>>, ParentType, ContextType, RequireFields<QueryGetMatchesByUserArgs, 'userId'>>;
  getUserByEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserByEmailArgs, 'email'>>;
  getUserStats?: Resolver<Maybe<ResolversTypes['UserStats']>, ParentType, ContextType, RequireFields<QueryGetUserStatsArgs, 'userId'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  googleId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tutPk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tutSk?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserStats'] = ResolversParentTypes['UserStats']> = {
  averageOpponentGoals?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  averageOpponentShots?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  averageOpponentXG?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  averagePossession?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  averageUserGoals?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  averageUserShots?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  averageUserXG?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  draws?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  gamesCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  losses?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rageQuits?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalOpponentGoals?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalOpponentShots?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalOpponentXG?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalUserGoals?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalUserShots?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalUserXG?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  winRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  wins?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Match?: MatchResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserStats?: UserStatsResolvers<ContextType>;
};

