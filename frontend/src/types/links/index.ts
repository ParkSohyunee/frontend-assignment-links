import { LinkType } from './links.dto'

export * from './links.dto'

export type RequestLinkType = Omit<LinkType, 'id' | 'createdById'>
