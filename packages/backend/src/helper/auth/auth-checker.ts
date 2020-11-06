import { AuthChecker } from 'type-graphql';
import { ContextType } from '../../type';

export const authChecker: AuthChecker<ContextType> = (
  { root, args, context, info },
  roles
) => {
  return !!context.me?.id;
};
