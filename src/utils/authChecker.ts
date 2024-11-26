import { AuthChecker } from 'type-graphql';
import { Context } from '../types/Context';

export const authChecker: AuthChecker<Context> = ({ context }) => {
  return !!context.user;
};