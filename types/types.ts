export type GenderNullable = Gender | null
export type Gender = 'f' | 'm'

export type StandardResponse = {
  id: number
  name: string
  has_numeric_value: boolean
  levels: {
    id: number
    level_number: number
    low_level_value: number
    middle_level_value: number
    high_level_value: number
    gender: Gender
  }[]
}

export type StandardRequest = {
  name: string
  has_numeric_value: boolean
  levels: {
    level_number: number
    low_level_value: number | null
    middle_level_value: number | null
    high_level_value: number | null
    gender: Gender
  }[]
}


export type StudentRequest = {
  full_name: string
  student_class: {
    number: number
    class_name: string
  }
  birthday: string
  gender: Gender
}

export type ClassResponse = {
  id: number
  class_name: string
  number: number
  recruitment_year: number
}

export type StudentsValueResponse = {
  id: number
  full_name: string
  student_class: {
    id: number
    number: number
    recruitment_year: number
    class_name: string
  }
  birthday: string
  gender: Gender
  value: number | null
  grade: number | null
}

export type StudentValueRequest = {
  student_id: number
  standard_id: number
  value: number | null
}

export type TokenRequest = {
  grant_type: string
  username: string
  password: string
  client_id: string
}
export type TokenResponse = {
  access_token: string
  expiress_in: number
  token_type: string
  scope: string
  refresh_token: string
}
export type TokenRefreshRequest = {
  grant_type: string
  client_id: string
  refresh_token: string
}
export type TokenRevokeRequest = {
  client_id: string
  token: string
}
export type CreateUserRequest = {
  email: string
  password: string
  confirm_password: string
  first_name: string
  last_name: string
  patronymic: string
}
export type CreateUserResponse = {
  email: string
  first_name: string
  last_name: string
  patronymic: string
  role: string
}
export type ProfileResponse = {
  id: number
  email: string
  first_name: string
  last_name: string
  patronymic: string
  full_name: string
}
export type DetailRequest = {
  first_name: string
  last_name: string
  patronymic: string
}
export type PaswordRequest = {
  current_password: string
  new_password: string
  confirm_new_password: string
}
export type StudentResponse = {
  id: number
  first_name: string
  last_name: string
  patronymic: string
  full_name: string
  student_class: {
    id: number,
    class_name: string,
    number: number,
    recruitment_year: number
  },
  birthday: string,
  gender: Gender
}
export type StudentStandardResponse = {
  Standard: {
    Id: number
    Name: string
    Has_numeric_value: boolean
  }
  Grade: number
  Value: number
  Level_number: number
}
export type FilterType = {
  gender: Gender | null
  grade: number[] | null
  year: {
    from: number | null
    before: number | null
  } | null
}