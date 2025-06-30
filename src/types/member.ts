export type Member = Record<string, unknown> & {
  id: string
  username: string
  name: string
  phone: string
  birthday: string
  affiliatedUniversityName: string
  createdAt: string
  lastLoginAt: string
}