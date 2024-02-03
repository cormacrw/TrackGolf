import * as _trpc_server_unstable_core_do_not_import from '@trpc/server/unstable-core-do-not-import';

declare const secureRouter: _trpc_server_unstable_core_do_not_import.Router<{
    ctx: object;
    meta: object;
    errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
    transformer: false;
}, {}>;
type SecureRouter = typeof secureRouter;

declare const publicRouter: _trpc_server_unstable_core_do_not_import.BuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: _trpc_server_unstable_core_do_not_import.DefaultErrorShape;
    transformer: false;
}, {
    hello: _trpc_server_unstable_core_do_not_import.QueryProcedure<{
        input: void;
        output: {
            message: string;
        };
    }>;
}>;
type PublicRouter = typeof publicRouter;

export type { PublicRouter, SecureRouter };
