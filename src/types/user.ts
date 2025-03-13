export interface User {
  id: number
  name: string
  email: string
  phone: string
  isActive: boolean
  pets: Pet[]
}

export interface Pet {
  id: number
  name: string
  type: string
  breed: string
  age: number
}
