import { Request } from 'express'

export function getIdParam(req: Request) {
  const id = req.params.id;
  if (/^\d+$/.test(id)) {
    return Number.parseInt(id, 10);
  }
  throw new TypeError(`Invalid ':id' param: "${id}"`);
}

export function pickRandom(args: string[]) {
  return args[Math.floor(Math.random() * args.length)];
}
