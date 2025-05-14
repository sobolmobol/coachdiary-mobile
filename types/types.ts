export type GenderNullable = Gender | null
export type Gender = 'f' | 'm'

export type StandardResponse = {
  id: number
  name: string
  has_numeric_value: boolean
  levels: {
    id: number
    is_lower_better: boolean
    level_number: number
    low_value: number
    middle_value: number
    high_value: number
    gender: Gender
  }[]
}

export type StandardRequest = {
  name: string
  has_numeric_value: boolean
  levels: {
    level_number: number
    low_value: number | null
    middle_value: number | null
    high_value: number | null
    gender: Gender
  }[]
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
    id: number
    class_name: string
    number: number
    recruitment_year: number
  }
  birthday: string
  gender: Gender
  invitation_link: string
}
export type StudentStandardResponse = {
  standards: {
    standard: {
      id: number
      name: string
      has_numeric_value: boolean
    }
      level_number: number
      value: number | null 
      grade: number | null
  }[]
  summary_grade: 4
}

export interface StandardByLevel {
  standard: {
    id: number
    name: string
    has_numeric_value: boolean
  }
  level_number: number
  value: number | null 
  grade: number | null
}
export type StudentRequest = {
  id: number
  first_name: string
  last_name: string
  patronymic: string
  student_class: {
    class_name: string
    number: number
  }
  birthday: string
  gender: Gender
}
export type NewStudentRequest = {
  first_name: string
  last_name: string
  patronymic: string
  student_class: {
    class_name: string
    number: number
  }
  birthday: string
  gender: Gender
}
