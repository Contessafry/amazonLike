/** @format */

export const mapNodes = {
  root: 'root',
} as const;
export type NodeID = (typeof mapNodes)[keyof typeof mapNodes];

export interface TUser{
  id:string
username: string
password: string
}

export interface TRoom{
  id: number
  createdAt: Date
  UpdatedAt: Date
  private: boolean
  name: string
  messages: Array<TMessage>
  users: Array<{idUser:TUser['id']
permission: "admin"|"moderator"|"user"
  }>
}

export interface TMessage{
  id: number
  createdAt: Date
  UpdatedAt: Date
  content: string
  IdUser: TUser['id']
  IdRoom: TRoom['id']
  ref: TMessage['id']
}