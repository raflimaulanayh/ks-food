interface Users {
  data: User[]
  meta: Meta
}

interface User {
  regionAssignment?: {
    postalName: string
    postalCode: string
    villageName: string
    villageCode: string
    subDistrictName: string
    subDistrictCode: string
    cityName: string
    cityCode: string
    provinceName: string
    provinceCode: string
    targetType: string
    id: string
    createdAt: string
    updatedAt: string
  }
  isTemporaryPassword: boolean
  isTwoFaAuthenticated: boolean
  isTwoFaEnabled: boolean
  twoFaSecret: string
  id: number
  email: string
  provider: string
  socialId: string
  firstName: string
  phone: string
  lastName: string
  role?: {
    id: number
    name: string
  }
  status?: {
    id: number
    name: string
  }
  createdAt: string
  updatedAt: string
  deletedAt: string
}
