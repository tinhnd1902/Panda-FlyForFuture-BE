import { AuthGuard } from '@nestjs/passport';

export class PandaAccountGuard extends AuthGuard('jwt') {}
