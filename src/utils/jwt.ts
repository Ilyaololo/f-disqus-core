import { Request } from 'express';

import { TLS } from 'config';

export function extractor(req: Request) {
  if (!req || !req.cookies) {
    return null;
  }

  return req.cookies[TLS];
}
